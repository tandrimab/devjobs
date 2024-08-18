import clientPromise from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import ApiError from "@/utilities/backend/ApiError";

export async function POST(request) {
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

    const currentUser = await userDb.findOne({ access_Token: token.access_Token });
    
    const filter = {
      userId: currentUser.userId,
    };

    const data = await request.json();

    const update = {
      $set: {
        profile: data.profile,
      },
    };
    const option = {
      upsert: true,
    };

    const updateResult = await userProfileDb.updateOne(filter, update, option);

    let res = {};

    if (updateResult?.modifiedCount) {
      res = {
        success: true,
        message: `${updateResult.modifiedCount} document(s) have been updated successfully`,
      };
    } else {
      throw new ApiError(
        500,
        "Unable to update user details. Please try again later."
      );
    }
    return NextResponse.json(res, {
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

export async function GET() {
  const cookieStore = cookies();

  const sessionCookie = cookieStore.get("next-auth.session-token");

  try {

    const token = await decode({
      token: sessionCookie.value,
      secret: process.env.NEXTAUTH_SECRET,
    });

    console.log("data", token);

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

    //TODO: only admin should be able to acccess the data. Restrict the access to admin

    const userProfile = db.collection("userProfile").find({});

    return NextResponse.json(userProfile, {
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
