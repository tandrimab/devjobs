import { NextResponse } from 'next/server';
import clientPromise from "@/libs/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("devjobs");
        const jobs = await db.collection("jobs").aggregate([
            {
                $lookup:
                {
                    from: "company",
                    localField: "companyDetails",
                    foreignField: "_id",
                    as: "companyDetails",
                },
            },
            {
                $addFields:
                {
                    companyDetails: {
                        $arrayElemAt: ["$companyDetails", 0],
                    },
                },
            },
            {
                $project: {
                    companyDetails: {
                        _id: 0
                    }
                }
            }
        ]).toArray();
        return NextResponse.json(
            jobs, {
            status: 200
        }
        )
    } catch (err) {
        return NextResponse.json(err, {
            status: 500
        })
    }
}