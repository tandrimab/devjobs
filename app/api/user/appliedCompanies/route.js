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

    const req = await request.json();

    const client = await clientPromise;

    const db = client.db("devjobs");

    const userDb = db.collection("users");

    const currentUser = await userDb.findOne({
      access_token: token.access_token,
    });

    let success = false;

    if (currentUser) {
      const result = db.collection("appliedCompanies").findOneAndUpdate(
        {
          jobId: req.jobId,
        },
        {
          $set: {
            userId: currentUser.userId,
            jobId: req.jobId,
            createdAt: Date.now()
          },
        },
        {
          upsert: true,
        }
      );
      if (result) {
        success = true;
      }
    } else {
      throw new ApiError(
        401,
        "User doesn't exist or session might have expired. Please login again."
      );
    }

    return NextResponse.json(
      {
        success,
      },
      { status: 200 }
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
    const token = await decode({
      token: sessionCookie?.value,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const client = await clientPromise;

    const db = client.db("devjobs");

    const currentUser = db
      .collection("users")
      .findOne({ access_token: token?.access_token });

    let application;

    if (currentUser) {
      application = await db
        .collection("appliedCompanies")
        .aggregate([
          {
            $lookup:
              {
                from: "jobs",
                localField: "jobId",
                foreignField: "id",
                as: "details",
              },
          },
          {
            $unwind:
              {
                path: "$details",
                preserveNullAndEmptyArrays: true,
              },
          },
          {
            $lookup:
              {
                from: "company",
                localField: "details.companyDetails",
                foreignField: "_id",
                as: "companyDetails",
              },
          },
          {
            $unwind:
              {
                path: "$companyDetails",
                preserveNullAndEmptyArrays: true,
              },
          },
        ])
        .toArray();
      return NextResponse.json(application, {
        status: 200,
      });
    } else {
      throw new ApiError(
        401,
        "User doesn't exist or session might have expired. Please login again."
      );
    }
  } catch (err) {
    return NextResponse.json(err, {
      status: 500,
    });
  }
}
