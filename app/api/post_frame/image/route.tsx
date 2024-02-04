import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import { kv } from "@vercel/kv";
import satori from "satori";
import { join } from 'path';
import * as fs from "fs";
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { FrameRequest } from '@coinbase/onchainkit';
import { FrameData } from '@coinbase/onchainkit/dist/types/core/types';

const fontPath = join(process.cwd(), 'Roboto-Black.ttf')
let fontData = fs.readFileSync(fontPath)

console.log(fontData);

export const GET = async (req: NextRequest, res: NextApiResponse) => {
    //pWHfcreOe3mojaRg
    // console.log(req)
    const MONGO_URL = `mongodb+srv://mandaakhilesh4:${process.env.NEXT_MONGO_PASSWORD}@cluster0.tgqtucm.mongodb.net/?retryWrites=true&w=majority`
    console.log(MONGO_URL);
    try {

        const body: FrameRequest = await req.json();

        console.log({ body })

        const untrustedData: FrameData = body.untrustedData

        console.log({ untrustedData });

        const client = new MongoClient(MONGO_URL, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });


        await client.connect();
        console.log('Connected to MongoDB ');

        // Select the database and collection
        const database = client.db('saycaster');
        const collection = database.collection("temp");

        // Query to get the latest 5 documents
        const latestDocuments = await collection.find().sort({ _id: -1 }).limit(5).toArray();

        const filteredDocuments = latestDocuments.filter(doc => doc.to === untrustedData.fid);

        console.log(filteredDocuments);


        // Display the results
        console.log('Latest 5 documents:', latestDocuments);

        // Close the MongoDB connection
        await client.close();
        console.log('Disconnected from MongoDB');

        const svg = await satori(
            <div style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                display: 'flex',
                width: '100%',
                height: '100%',
                backgroundColor: 'f4f4f4',
                padding: 50,
                lineHeight: 1.2,
                fontSize: 24,
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 20,
                }}>
                    {filteredDocuments.map((document, index) => (
                        <h2 key={index} style={{ textAlign: 'center', color: 'lightgray' }}>{document.body}</h2>
                    ))}
                </div>
            </div>
            ,
            {
                width: 600, height: 400, fonts: [{
                    data: fontData,
                    name: 'Roboto',
                    style: 'normal',
                    weight: 400
                }]
            })

        // Convert SVG to PNG using Sharp
        const pngBuffer = await sharp(Buffer.from(svg))
            .toFormat('png')
            .toBuffer();



        return new NextResponse(
            pngBuffer,
            {
                status: 200,
                headers: {
                    'Content-Type': 'image/png',
                    'Cache-Control': 'max-age=10'
                },
            }
        );

    } catch (error) {
        console.error(error);
    }
}

