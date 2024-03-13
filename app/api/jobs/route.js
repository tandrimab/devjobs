import connectDB from '@/libs/mongodb';
import Jobs from '@/models/jobs';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();
        const jobs = await Jobs.find();
        return NextResponse.json(jobs, {
            status: 200
        });
    } catch(error) {
        NextResponse.json(error, {
            status: 500
        })
    }
    
}