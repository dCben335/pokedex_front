"use client"

import { GenerateFormProps } from "@/components/customs/Form/Form";
import AuthForm from "../../../components/customs/Auth/AuthForm/AuthForm";
import { register } from "@/libs/routes/entities/user";
import { UserRequest, UserResponse } from "@/libs/schemas/entities/user";
import { toast } from "sonner";
import Link from "next/link";
import { storeCookies } from "@/actions/cookies";
import { navigate } from "@/actions/navigate";
import { slugify } from "@/utils/reformat";

const RegisterForm = ({}) => {

    const onSubmit: GenerateFormProps['onSubmit'] = async (data) => {
        if (data.password !== data.confirm_password) {
            return toast.error("Password and confirm password fields must be the same");
        }

        const response = await register(data as UserRequest) as UserResponse | { error: string };
        if ("error" in response) {
            return toast.error("The user already exists, please try again with another name");
        }
        
        const sluggifiedLogin = slugify(response.user.login);
        storeCookies({ token: response.token, login: sluggifiedLogin, isAdmin: response.user.isAdmin.toString() });
        toast.success("User registered successfully");
        await navigate(`/trainers/${sluggifiedLogin}`);
    };

    return (
        <AuthForm onSubmit={onSubmit} title={"Register"} isRegister={true}>
            <p>Already have an account ? <Link href="/login">Login</Link></p>
        </AuthForm>
    )
}

export default RegisterForm;
