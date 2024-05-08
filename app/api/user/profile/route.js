import clientPromise from "@/libs/mongodb";
import ApiError from "@/utilities/backend/ApiError";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();

  const sessionCookie = cookieStore.get("next-auth.session-token");

  try {
    if (!sessionCookie || !sessionCookie.value) {
      throw new ApiError(401, "Authentication required");
    }

    const token = await decode({
      token: sessionCookie.value,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token || !token.access_token) {
      if (!token) {
        throw new ApiError(400, "Missing request body");
      }

      if (!token.access_token) {
        throw new ApiError(401, "Authentication required");
      }
    }

    const client = await clientPromise;

    const db = client.db("devjobs");

    const userDb = db.collection("users");

    const userProfileDb = db.collection("userProfile");

    const currentUser = await userDb.findOne({ access_token: token.access_token });
    
    if (!currentUser) {
      throw new ApiError(401, "Session might have expired, please login again");
    }

    const filter = {
      userId: currentUser?.userId,
    };

    const details = await userProfileDb.findOne(filter);

    const profile = details?.profile;

    return NextResponse.json({
      success: true,
      profile
    }, {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
        ...e,
      },
      {
        status: e.code || 500,
      }
    );
  }
}
