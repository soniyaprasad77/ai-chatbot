import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
export function getUserFromToken() {
    const token = cookies().get("token")?.value;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    if (!token) {
        throw new Error("Unauthorized");
    }
    // if (token) {
    //     return token;
    // }
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & { userId: string };
        console.log("decodedToken", decodedToken);
        return decodedToken;
    } catch (error) {
        console.error("Token verification failed:", error);
        throw new Error("Unauthorized");
    }

}