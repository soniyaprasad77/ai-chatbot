import Chat from "@/models/Chat";
import dbConnect from "@/lib/dbConnect";
import { getUserFromToken } from "@/lib/auth";
export async function GET(req: Request, res: Response) {
    try {
        await dbConnect();
    } catch (error) {
        console.error("Database connection failed:", error);
        return new Response("Internal Server Error", { status: 500 });
    }

    try {
        const user = getUserFromToken();
        if (!user.userId) {
            return new Response("Unauthorized", { status: 401 });
        }
        // console.log("User ID:", user.userId);
        const chats = await Chat.find({ user: user.userId });
        // console.log("Chats:", chats);
        return new Response(JSON.stringify(chats), { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}