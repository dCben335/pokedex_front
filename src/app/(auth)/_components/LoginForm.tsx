"use client"

import { GenerateFormProps } from "@/components/customs/Form/Form";
import AuthForm from "./AuthForm/AuthForm";

const LoginForm = ({}) => {
    const onSubmit: GenerateFormProps['onSubmit'] = async (data) => {
        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(data);
                }, 2000);
            });
            console.log("Form data submitted:", data);
        } catch (error) {
            console.error("Form submission failed:", error);
        }
    };

    return (
        <AuthForm onSubmit={onSubmit} title={"Login"} />
    )
}

export default LoginForm;
