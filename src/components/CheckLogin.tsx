
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/services/myButton";
import LogoutButton from "@/components/LogoutButton";

const CheckLogin = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status=="unauthenticated") {
            router.push("/login2");


        }
    }, [status]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if(status=="unauthenticated")
    {
        return <p>Please Log in</p>;
    }

    return <p>Hello {session?.user?.username}&nbsp;<LogoutButton /></p>;
};

export default CheckLogin