import NextAuth from "next-auth";
import GithubProviders from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import AzureProvider from "next-auth/providers/azure-ad";

export const authOptions = {
    providers: [
        GithubProviders({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? ''
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        AzureProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            console.log('jwt', token, account, profile);
            if (account && profile) {
                token.id = profile.id;
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token, user}) {
            console.log('id', token.id)
            session.user.accessToken = token.accessToken;
            session.user.id = token.id;
            return session;
        }
    }
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };