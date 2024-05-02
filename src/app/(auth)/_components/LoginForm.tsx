"use client"

import { GenerateFormProps } from "@/components/customs/Form/Form";
import AuthForm from "../../../components/customs/Auth/AuthForm/AuthForm";
import Link from "next/link";
import { UserRequest, UserResponse } from "@/libs/schemas/entities/user";
import { login } from "@/libs/routes/entities/user";
import { toast } from "sonner";
import { storeCookies } from "@/actions/cookies";
import { navigate } from "@/actions/navigate";
import { slugify } from "@/utils/reformat";

const LoginForm = ({ }) => {
    const onSubmit: GenerateFormProps['onSubmit'] = async (data) => {
        const registerData = data as UserRequest;
        const response = await login(registerData) as UserResponse | { error: string };
        if ("error" in response) {
            return toast.error("Error logging in, please check your credentials");
        }
        const sluggifiedLogin = slugify(response.user.login);
        storeCookies({ token: response.token, login: sluggifiedLogin, isAdmin: response.user.isAdmin.toString() });
        toast.success("User registered successfully");
        await navigate(`/trainers/${sluggifiedLogin}`);
    };

    return (
        <AuthForm onSubmit={onSubmit} title={"Login"} isRegister={false}>
            <p>Don&apos;t have an account yet ? <Link href="/register">Register</Link></p>
        </AuthForm>
    )
}

export default LoginForm;
