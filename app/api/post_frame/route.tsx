import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { Inter } from 'next/font/google';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import satori from 'satori';
const fs = require('fs');



const NEXT_PUBLIC_URL = 'https://saycaster.vercel.app';


async function getResponse(req: NextRequest): Promise<NextResponse> {
    let accountAddress: string | undefined = '';
    let text: string | undefined = '';

    try {

        const body: FrameRequest = await req.json();

        console.log({ body })

        const untrustedData = body.untrustedData

        console.log({ untrustedData });

        //TODO : send data to DB



    } catch (e) {
        console.log(e);
    }


    const fontPath = join(process.cwd(), "Roboto-Black.ttf");
    const fontData = fs.readFileSync(fontPath);

    console.log(fontData);

    //TODO : fetch data from backend and populate div

    const imageUrl = `${NEXT_PUBLIC_URL}/api/image`

    return new NextResponse(
        `< !DOCTYPE html >
            <html>
                <head>
                    <meta property="fc:frame" content="vNext" />
                    <meta property="fc:frame:image" content="${imageUrl}" />
                    <meta property="og:image" content="${NEXT_PUBLIC_URL}/park-2.png" />
                </head>
            </html>
        `,
        {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
            },
        }
    );
}

export async function POST(req: NextRequest) {
    return getResponse(req);
}





