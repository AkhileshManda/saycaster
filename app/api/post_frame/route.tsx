import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import satori from 'satori';


const NEXT_PUBLIC_URL = 'https://saycaster.vercel.app';

//Just for ref: 
const sendAnonMessageFrame =
    `
        < !DOCTYPE html >
        <html>
        <head>
            <meta property="fc:frame" content = "vNext" />
            <meta property="fc:frame:image" content = "${NEXT_PUBLIC_URL}/park-1.png" />
            <meta property="fc:input:text" content = "Enter Text Here" />
            <meta property="fc:frame:button:1" content = "${NEXT_PUBLIC_URL}/api/post_frame" />
        </head>
        </html>`


const messageSentFrame =
    `
       `




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

    const svg = await satori(
        <div style={{ color: 'black' }}>hello, world</div>,
        {
            width: 600,
            height: 400,
            fonts: [
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





