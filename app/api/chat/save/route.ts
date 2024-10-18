import dbConnect from "@/lib/dbConnect";
import Chat from "@/models/Chat";
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    const token = cookies().get("token")?.value;
    // decrypt the token using the JWT_SECRET
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    let decodedToken;
    try {
        if (!token) {
            return new Response("Unauthorized", { status: 401 });
        }
        decodedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & { userId: string };
        console.log(decodedToken);
    } catch (error) {
        console.error("Token verification failed:", error);
        return new Response("Unauthorized", { status: 401 });
    }


    console.log(token)
    if (!token) {
        return new Response("Unauthorized", { status: 401 });
    }
    try {
        await dbConnect();
    } catch (error) {
        console.error("Database connection failed:", error);
        return new Response("Internal Server Error", { status: 500 });
    }

    try {
        const data = await req.json();
        const newChat = new Chat({ ...data, user: decodedToken.userId });
        console.log(newChat)
        await newChat.save();
        return new Response("Chat saved successfully", { status: 200 });
    } catch (error) {
        console.error("Error saving chat:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}