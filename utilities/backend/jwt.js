import * as jose from "jose";

const encodedSecret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export const encode = async (params) => {
  try {
    const signedToken = await new jose.SignJWT(params.token)
      .setProtectedHeader({ alg: "HS256" })
      .sign(encodedSecret);

    if (!signedToken) {
      throw new Error("Unable to sign JWT");
    }

    return signedToken;
  } catch (e) {
    console.log("JWT error", e);
    throw new Error(e);
  }
};

export const decode = async (params) => {
  if (!params.token) {
    throw new Error("Unable to verify JWT");
  }
  let token = params.token;
  try {
    let decodedToken = await jose.jwtVerify(token, encodedSecret);

    if (!decodedToken.payload) {
      throw new Error("Unable to verify JWT");
    }

    return decodedToken;
  } catch (e) {
    console.log("JWT error", e);
    throw new Error(e);
  }
};
