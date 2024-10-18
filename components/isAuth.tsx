// isAuth.tsx

"use client";
import { isAuthenticated } from "@/lib/utils";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function isAuth(Component: React.FC) {
    return function IsAuth(props: React.ComponentProps<typeof Component>) {
        const auth = isAuthenticated;

        useEffect(() => {
            if (!auth) {
                return redirect("/login");
            }
        }, []);

        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}
