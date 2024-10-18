// isAuth.tsx

"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
export default function IsAuth(Component: React.FC) {
    return function IsAuth(props: React.ComponentProps<typeof Component>) {
        const isAuthenticated = useSelector((state: { user: { isLoggedIn: boolean } }) => state.user.isLoggedIn);
        const auth = isAuthenticated;
        useEffect(() => {
            if (!auth) {
                return redirect("/login");
            }
        }, [auth]);

        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}
