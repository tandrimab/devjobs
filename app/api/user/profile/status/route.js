import clientPromise from "@/libs/mongodb";
import ApiError from "@/utilities/backend/ApiError";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();

  const sessionCookie = cookieStore.get("next-auth.session-token");

  try {
    const token = await decode({
      token: sessionCookie.value,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const client = await clientPromise;

    const db = client.db("devjobs");

    const userDb = db.collection("users");

    const userProfileDb = db.collection("userProfile");

    const currentUser = await userDb.findOne({
      access_token: token.access_token,
    });

    if (!currentUser) {
      throw new ApiError(401, "Session might have expired, please login again");
    }

    const filter = {
      userId: currentUser?.userId,
    };

    const details = await userProfileDb.findOne(filter);

    const profile = details?.profile;

    const res = {}

    if (
      profile &&
      Object.keys(profile).length &&
      profile.hasOwnProperty("personalDetails") &&
      profile.hasOwnProperty("education") &&
      profile.hasOwnProperty("experience") &&
      profile.hasOwnProperty("application")
    ) {
        res.uploaded = true
    } else [
        res.uploaded = false
    ]
    return NextResponse.json(
        {
          success: true,
          isUploaded: res.uploaded
        },
        {
          status: 200,
        }
      );
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
