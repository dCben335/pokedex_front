"use client"

import { GenerateFormProps } from "@/components/customs/Form/Form";
import AuthForm from "./AuthForm/AuthForm";
import Link from "next/link";
import { UserRequest } from "@/libs/zod/user";
import { login } from "@/libs/routes/user";
import { toast } from "sonner";
import { useUser } from "@/components/providers/UserContext";

const LoginForm = ({}) => {
    const { setUser } = useUser();

    const onSubmit: GenerateFormProps['onSubmit'] = async (data) => {
        const registerData = data as UserRequest;
        const response = await login(registerData);
        
        if ("error" in response) {
            return toast.error(response.error);
        }

        toast.success("User registered successfully");
        setUser(response.user, response.token);

    };

    return (
        <AuthForm onSubmit={onSubmit} title={"Login"}>
            <p>Don&apos;t have an account yet ? <Link href="/register">Register</Link></p>
        </AuthForm>
    )
}

export default LoginForm;
