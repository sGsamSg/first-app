import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignInPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // If the user is already signed in, redirect to the home page

    if (!!session) {
        redirect("/");
    }
    return <SignInView />;
};

export default SignInPage;