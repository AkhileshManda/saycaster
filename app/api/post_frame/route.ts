import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

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
        < !DOCTYPE html >
        <html>
        <head>
            <meta property="fc:frame" content = "vNext" />
            <meta property="fc:frame:image" content = "${NEXT_PUBLIC_URL}/api/get_text" />
            <meta property="og:image" content = "${NEXT_PUBLIC_URL}/park-2.png" />
        </head>
        </html>`


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



    return new NextResponse(
        messageSentFrame,
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

// export async function GET(req: NextRequest) {
//     return new NextResponse({ 'hello': '123' }, {
//         status: 200,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })

// }




