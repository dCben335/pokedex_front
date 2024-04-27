"use client"

import { GenerateFormProps } from "@/components/customs/Form/Form";
import AuthForm from "../../../components/customs/Auth/AuthForm/AuthForm";
import { register } from "@/libs/routes/entities/user";
import { UserRequest } from "@/libs/schemas/user";
import { toast } from "sonner";
import { useUser } from "@/components/providers/UserContext";
import Link from "next/link";

const RegisterForm = ({}) => {
    const { setUser } = useUser();

    const onSubmit: GenerateFormProps['onSubmit'] = async (data) => {
        if (data.password !== data.confirm_password) {
            return toast.error("Password and confirm password fields must be the same");
        }

        const response = await register(data as UserRequest);
        if ("error" in response) {
            return toast.error(response.error);
        }

        toast.success("User registered successfully");
        setUser(response.user, response.token);
    };

    return (
        <AuthForm onSubmit={onSubmit} title={"Register"} isRegister={true}>
            <p>Already have an account ? <Link href="/login">Login</Link></p>
        </AuthForm>
    )
}

export default RegisterForm;
