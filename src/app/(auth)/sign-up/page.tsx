import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // If the user is already signed in, redirect to the home page

    if (!!session) {
        redirect("/");
    }
    return <SignUpView />;
};

export default SignUpPage;