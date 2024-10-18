import dbConnect from "@/lib/dbConnect";
// import Chat from "@/models/Chat";
// import { NextResponse } from "next/server";


export async function GET() {
    try {
        dbConnect();
    }
    catch (error) {
        console.log(error);
    }
    // const { userId } = req.body;
    // const chats = await Chat.find({ user: userId });
    // return NextResponse.json({ "chats": chats })
}