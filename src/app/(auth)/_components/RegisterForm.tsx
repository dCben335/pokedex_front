"use client"

import { GenerateFormProps } from "@/components/customs/Form/Form";
import AuthForm from "./AuthForm/AuthForm";
import { register } from "@/libs/routes/user";
import { UserRequest } from "@/libs/zod/user";
import { toast } from "sonner";
import { useUser } from "@/components/providers/UserContext";

const RegisterForm = ({}) => {
    const userContext = useUser();

    const onSubmit: GenerateFormProps['onSubmit'] = async (data) => {
        const registerData = data as UserRequest;
        const response = await register(registerData);
        
        if ("error" in response) {
            return toast.error(response.error);
        }

        toast.success("User registered successfully");
        userContext.setUser(response.user, response.token);

    };

    return (
        <AuthForm onSubmit={onSubmit} title={"Register"} />
    )
}

export default RegisterForm;
