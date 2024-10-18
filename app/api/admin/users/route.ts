import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {

    try {
        await dbConnect();
    }
    catch (err) {
        console.log(err);
    }
    const users = await User.find({});
    return NextResponse.json({ message: "", users });
}