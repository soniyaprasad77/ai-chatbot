import dbConnect from "@/lib/dbConnect";
import Chat from "@/models/Chat";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { userId: string } }) {
    try {
        dbConnect();
    }
    catch (error) {
        console.log(error);
    }
    const chats = await Chat.find({ user: params.userId });
    return NextResponse.json({ "chats": chats })
}