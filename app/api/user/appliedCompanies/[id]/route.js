import clientPromise from "@/libs/mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decode } from "next-auth/jwt";

export async function GET(request, { params }) {
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

    const currentUser = await userDb.findOne({
      access_token: token.access_token,
    });

    if (!currentUser) {
      throw new ApiError(401, "Session might have expired, please login again");
    }

    const query = {
      $and: [
        {
          userId: { $eq: currentUser.userId },
        },
        {
          jobId: {
            $eq: params.id,
          },
        },
      ],
    };

    const result = await db.collection("appliedCompanies").findOne(query, { _id: 0 });

    let response = {};

    if (Object.keys(result)) {

      response = {
        success: true
      };
    }

    return NextResponse.json(response, { status: 200 });
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
