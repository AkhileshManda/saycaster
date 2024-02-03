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
        // const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

        // if (isValid) {
        //     accountAddress = message.interactor.verified_accounts[0];
        // }

        console.log({ body })

        // if (body?.untrustedData?.inputText) {
        //     text = body.untrustedData.inputText;
        // }

        // console.log(`text is ${ text }`);
        const untrustedData = body.untrustedData

        console.log({ untrustedData });

        //TODO : send data to backend


    } catch (e) {
        console.log(e);
    }


    const fontPath = join(process.cwd(), "Roboto-Black.ttf");
    const fontData = fs.readFileSync(fontPath);

    console.log(fontData);

    //TODO : fetch data from backend and populate div
    const svg = await satori(
        <div style={{ color: 'black' }}>hello, world</div>,
        {
            width: 600,
            height: 400,
            fonts: [
                {
                    name: 'Roboto',
                    // Use `fs` (Node.js only) or `fetch` to read the font as Buffer/ArrayBuffer and provide `data` here.
                    data: fontData,
                    weight: 400,
                    style: 'normal',
                },
            ],
        },
    )
    return new NextResponse(
        `< !DOCTYPE html >
            <html>
                <head>
                    <meta property="fc:frame" content="vNext" />
                    <meta property="fc:frame:image" content="${svg}" />
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





