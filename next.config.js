/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "svodEw3MakE1yixdmWLM1G1LZIUHSZ+J9NGvT4WzzPk=",

    GITHUB_ID: "df7553e69c06f2f50c44",
    GITHUB_SECRET: "ea551c26e7e4e36ad726c2af020ad0962d2fb3f7",

    GOOGLE_ID:
      "714534511827-urikhonhiuk121s7javpb763gp01hvhm.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",

    AZURE_AD_CLIENT_ID: "18a758b6-4bfe-40a8-a5a7-c7f4272118ff",
    AZURE_AD_CLIENT_SECRET: "yw_8Q~6CmHw3U-8MH1YXCqu2ZnrsNlFjxiX7acV6",
    AZURE_AD_TENANT_ID: "f8cdef31-a31e-4b4a-93e4-5f571e91255a",

    MONGODB_URI:
      "mongodb+srv://bhattacharjeetan:9veub0jLNF56g1Lj@cluster0.6hewuvz.mongodb.net/devjobs",

    GOOGLE_MAP_API_KEY: "AIzaSyATc5OPGdXedTO0Lmr_rCAKJuRknJspXt0",
  },
};

module.exports = nextConfig;
