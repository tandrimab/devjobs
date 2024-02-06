import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const file = await fs.readFile(process.cwd() + '/public/constants/data.json', 'utf8');
        const data = JSON.parse(file);
        return NextResponse.json(data, {
            status: 200
        })
    } catch({ name, message }) {
        return NextResponse.json({error: `${error}: ${message}`}, {status: 500})
    }
}