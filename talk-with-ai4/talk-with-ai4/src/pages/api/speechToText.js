import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
});

export default async function POST(req) {
    const tmpDir = path.join(process.cwd(), "tmp");
    const filePath = path.join(tmpDir, "input.wav");

    try {
        const body = await req.json();
        const base64Audio = body.audio;

        // Convert base64 to Buffer
        const audio = Buffer.from(base64Audio, "base64");

        // Ensure tmp directory exists
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
        }

        // Write audio to a temporary file
        fs.writeFileSync(filePath, audio);

        // Create a readable stream
        const readStream = fs.createReadStream(filePath);

        // Call OpenAI API
        const data = await openai.audio.transcriptions.create({
            file: readStream,
            model: "whisper-1",
        });

        // Clean up temporary file
        fs.unlinkSync(filePath);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error processing audio:", error);

        // Clean up temporary file in case of error
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return NextResponse.json(
            { error: "Error processing audio", details: error.message },
            { status: 500 }
        );
    }
}
