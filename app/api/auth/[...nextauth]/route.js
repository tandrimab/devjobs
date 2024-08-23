import NextAuth from "next-auth";
import GithubProviders from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import AzureProvider from "next-auth/providers/azure-ad";
import { encode } from "@/utilities/backend/jwt";

const oauthEndpoint = {
  github: {
    url: 'https://github.com/login/oauth/access_token',
    id: process.env.GITHUB_ID,
    secret: process.env.GITHUB_SECRET,
  },
  google: {
    url: 'https://oauth2.googleapis.com/token',
    id: process.env.GOOGLE_ID,
    secret: process.env.GOOGLE_SECRET,
  }
}

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProviders({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    AzureProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
    async jwt({ token, account, profile }) {
      token.id = token?.sub || account?.providerAccountId || profile?.id;
      token.error={};
      if (account) {
        token.access_token = account.access_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        token.provider = account.provider;        
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        if (!token.refresh_token) throw new Error("Missing refresh token");

        try {
          const url = oauthEndpoint[token?.provider]?.url;
          const body = new URLSearchParams({
            client_id: oauthEndpoint[token?.provider]?.id,
            client_secret: oauthEndpoint[token?.provider]?.secret,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
          })
          
          const response = await fetch(url, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },

            body: new URLSearchParams({
              client_id: oauthEndpoint[token?.provider]?.id,
              client_secret: oauthEndpoint[token?.provider]?.secret,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token,
            }),

            method: "POST",
          });          

          const tokens = await response.json();

          if (!response.ok) throw tokens;
          
          token.error = {};

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          token.error = error;
        }
      }
      return token;
    },
    async session({ session, token, error }) {
      if (token.error && Object.keys(token.error).length) {
        return {}
      }
      let responseJson;
      try {
        let signedData = await encode({
          token: {
            access_token: token?.access_token,
            email: token?.email,
            refresh_token: token?.refresh_token,
            name: token?.name,
            image: token?.picture
          },
        });
        const response = await fetch(process.env.NEXTAUTH_URL + "/api/user", {
          method: "POST",
          headers: {
            Cookie: `next-auth.session-token=${token?.access_token}`,
          },
          body: JSON.stringify({ token: signedData }),
        });

        responseJson = await response.json();        

        if (!responseJson.success) {
          throw responseJson;
        }
      } catch (e) {
        console.log("error in session", e);
        return { ...responseJson };
      }

      const sessionDataSigned = await encode({
        token: {
          name: token?.name,
          email: token?.email,
          image: token?.picture,
        },
      });
      
      session.user = sessionDataSigned;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
