"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const HomeView = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    if (!session) {
        return <div>Loading...</div>;
    }

    return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1>Home</h1>
        <p>Welcome {session?.user?.name}</p>
        <Button onClick={() => authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        })}>Sign Out</Button>
    </div>
    );
};