import { NextRequest, NextResponse } from "next/server";

const text = `<p> HI </p>`

async function getResponse(req: NextRequest): Promise<NextResponse> {

    return new NextResponse(
        text,
        {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
            },
        }
    );
}

export async function GET(req: NextRequest) {
    return getResponse(req);
}
