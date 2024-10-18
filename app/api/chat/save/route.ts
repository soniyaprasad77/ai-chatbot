import dbConnect from "@/lib/dbConnect";
import Chat from "@/models/Chat";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req: Request) {

    try {
        await dbConnect();
    } catch (error) {
        console.error("Database connection failed:", error);
        return new Response("Internal Server Error", { status: 500 });
    }

    try {
        const user = getUserFromToken();
        console.log("User ID:", user.userId);
        const data = await req.json();
        const newChat = new Chat({ ...data, user: user.userId });
        console.log(newChat)
        await newChat.save();
        return new Response("Chat saved successfully", { status: 200 });
    } catch (error) {
        console.error("Error saving chat:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}