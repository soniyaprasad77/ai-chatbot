import { GoogleGenerativeAI } from "@google/generative-ai";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
    throw new Error("GOOGLE_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateAnswer(prompt: string): Promise<string> {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to generate content");
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
    } catch (error) {
        console.error("Database connection failed:", error);
        return new Response("Internal Server Error", { status: 500 });
    }

    try {
        const { questions } = await req.json();
        const prompt = questions;

        try {
            const answer = await generateAnswer(prompt);
            console.log(answer);
            // console.log(typeof(answer));
            return new Response(answer, { status: 200 });
            // return NextResponse.json(JSON.parse(answer), { status: 200 });
        } catch (error) {
            console.error("Error in generateAnswer:", error);
            return new Response("Internal Server Error", { status: 500 });
        }

    } catch (error) {
        console.error("Error processing request:", error);
        return new Response("Bad Request", { status: 400 });
    }
}
