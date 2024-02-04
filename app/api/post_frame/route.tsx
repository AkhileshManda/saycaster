import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { FrameData } from '@coinbase/onchainkit/dist/types/core/types';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { Inter } from 'next/font/google';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import satori from 'satori';
const fs = require('fs');



const NEXT_PUBLIC_URL = 'https://saycaster.vercel.app';

const MONGO_URL = `mongodb+srv://mandaakhilesh4:${process.env.NEXT_MONGO_PASSWORD}@cluster0.tgqtucm.mongodb.net/?retryWrites=true&w=majority`
console.log(process.env.NEXT_MONGO_PASSWORD);

const client = new MongoClient(MONGO_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function getResponse(req: NextRequest): Promise<NextResponse> {
    let accountAddress: string | undefined = '';
    let text: string | undefined = '';

    console.log({ req });

    try {

        const body: FrameRequest = await req.json();

        console.log({ body })

        const untrustedData: FrameData = body.untrustedData

        console.log({ untrustedData });

        //TODO : send data to DB

        await client.connect();
        console.log("connected");
        // Send a ping to confirm a successful connection
        const database = client.db('saycaster');
        const collection = database.collection(untrustedData.castId.fid.toString());

        const jsonData = {
            "from": untrustedData.fid.toString(),
            "to": untrustedData.castId.fid.toString(),
            "body": untrustedData.inputText
        }


        // const jsonData = {
        //     "from": "1",
        //     "to": "2",
        //     "body": "abc"
        // }

        // Insert the JSON data into MongoDB
        await collection.insertOne(jsonData);
        console.log('Data stored in MongoDB');

        // Close the MongoDB connection
        await client.close();
        console.log('Disconnected from MongoDB');


    } catch (e) {
        console.log(e);
    }


    const fontPath = join(process.cwd(), "Roboto-Black.ttf");
    const fontData = fs.readFileSync(fontPath);

    console.log(fontData);

    //TODO : fetch data from backend and populate div

    const imageUrl = `${NEXT_PUBLIC_URL}/api/post_frame/image`

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
