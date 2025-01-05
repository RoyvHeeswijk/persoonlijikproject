import { NextResponse } from "next/server";
import fs from "fs"; // Gebruik de reguliere fs voor createReadStream
import path from "path";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "sk-proj--tR6iDWODK8HJIhGSJjF2kh0rwbkB7Xu4cUuj8GpJEvvcxROVWgLA_qA6fJ_IPTX4lN_ON- USeT3BlbkFJ0MybUm8YQvq3AVg0S8j_36sqz - 1IEpPfdt6aaSQVVWJLXdfGWa2f6HbKy6h5rWVXoXG_Z9R - AA"
});
console.log(process.env.OPENAI_API_KEY); // Controleer of de sleutel correct is geladen

export async function POST(req) {
  // Gebruik een absoluut pad voor het bestand
  const tmpDir = path.join(process.cwd(), "tmp");
  const filePath = path.join(tmpDir, "input.wav");

  try {
    // Parse de inkomende JSON
    const body = await req.json();
    console.log("Incoming request body:", body); // Log de request-body

    const base64Audio = body.audio;

    if (!base64Audio) {
      return NextResponse.json(
        { error: "Audio data is missing" },
        { status: 400 }
      );
    }

    // Decodeer de base64 audio naar een buffer
    const audio = Buffer.from(base64Audio, "base64");

    // Controleer of de tmp-map bestaat en maak deze indien nodig
    try {
      await fs.promises.mkdir(tmpDir, { recursive: true });
      console.log("tmp directory created or already exists.");
    } catch (err) {
      console.error("Error creating tmp directory:", err);
      return NextResponse.json(
        { error: "Failed to create temporary directory" },
        { status: 500 }
      );
    }

    // Schrijf het audiobestand naar de tmp-map
    await fs.promises.writeFile(filePath, audio);
    console.log("Audio file written to:", filePath);

    // Gebruik fs.createReadStream om het bestand in de OpenAI API te laden
    const readStream = fs.createReadStream(filePath);
    console.log("File stream created.");

    // Roep de OpenAI Whisper API aan
    const data = await openai.audio.transcriptions.create({
      file: readStream,
      model: "whisper-1",
    });

    console.log("OpenAI response:", data);

    // Verwijder het bestand na gebruik
    await fs.promises.unlink(filePath);
    console.log("Temporary file deleted.");

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error processing audio:", error);

    // Probeer het bestand te verwijderen bij een fout
    try {
      await fs.promises.unlink(filePath);
    } catch (unlinkError) {
      console.error("Error deleting temporary file:", unlinkError);
    }

    // Retourneer een duidelijke foutmelding
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
