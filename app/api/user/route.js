import clientPromise from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import ApiError from "@/utilities/backend/ApiError";
import { ObjectId } from "mongodb";
import { decode } from "@/utilities/backend/jwt";

export async function POST(request) {
  
  try {
    const { token } = await request.json();

    const decoded = await decode({token});

    const decodedToken = decoded.payload;

    const client = await clientPromise;

    const db = client.db("devjobs");

    const usersDb = db.collection("users");

    const userProfileDb = db.collection("userProfile");

    let existingUser = await userProfileDb.findOne({
      "profile.personalDetails.email": decodedToken.email, 
    });

    const id = new ObjectId().toString();

    if (!existingUser) {

      existingUser = {
        userId: id,
        profile: {
          personalDetails: {
            email: decodedToken?.email,
            name: decodedToken?.name,
            image: decodedToken?.image
          },
        },
      };
      await userProfileDb.insertOne(existingUser);
    }

    const user = await usersDb.findOneAndUpdate(
      { refresh_token: decodedToken?.refresh_token },
      {
        $set: {
          userId: existingUser?.userId,
          refresh_token: decodedToken?.refresh_token,
          access_token: decodedToken?.access_token,
          modifiedAt: Date.now(),
        },
      },
      {
        upsert: true,
      }
    );

    return NextResponse.json(
      {
        success: true,
        user,
        message: `You're now logged in.`,
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
        throw new ApiError(401, "Authentication required.");
      }
    }

    const client = await clientPromise;

    const db = client.db("devjobs");

    const currentUser = await db
      .collection("users")
      .findOne({ access_token: token.access_token });

    let users = {};

    if (currentUser?.isAdmin) {
      users = await db.collection("users").find({});

      users = await users.toArray();
    } else {
      throw new ApiError(
        401,
        "Admin authentication required to process this request."
      );
    }

    return NextResponse.json(users, {
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
