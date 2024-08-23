/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: "",
    NEXTAUTH_SECRET: "svodEw3MakE1yixdmWLM1G1LZIUHSZ+J9NGvT4WzzPk=",

    GITHUB_ID: "Iv23li5UwsqYdjmoqWmh",
    GITHUB_SECRET: "7d016e1ccf7252cb900126805989c98b75e524d0",

    GOOGLE_ID:
      "714534511827-urikhonhiuk121s7javpb763gp01hvhm.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",

    AZURE_AD_CLIENT_ID: "18a758b6-4bfe-40a8-a5a7-c7f4272118ff",
    AZURE_AD_CLIENT_SECRET: "yw_8Q~6CmHw3U-8MH1YXCqu2ZnrsNlFjxiX7acV6",
    AZURE_AD_TENANT_ID: "f8cdef31-a31e-4b4a-93e4-5f571e91255a",

    MONGODB_URI:
      "mongodb+srv://bhattacharjeetan:9veub0jLNF56g1Lj@cluster0.6hewuvz.mongodb.net/devjobs",

    GOOGLE_MAP_API_KEY: "AIzaSyAqFKw-zJsjL4vhwFjaQ0wf73D2-iZHUog",
  },
};

module.exports = nextConfig;
