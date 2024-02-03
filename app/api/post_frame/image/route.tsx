import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import { kv } from "@vercel/kv";
import satori from "satori";
import { join } from 'path';
import * as fs from "fs";
import { NextRequest, NextResponse } from 'next/server';

const fontPath = join(process.cwd(), 'Roboto-Black.ttf')
let fontData = fs.readFileSync(fontPath)

console.log(fontData);

export const GET = async (req: NextRequest, res: NextApiResponse) => {

    console.log(req.method)

    try {

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
                    <h2 style={{ textAlign: 'center', color: 'lightgray' }}>HelloWorld</h2>


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

