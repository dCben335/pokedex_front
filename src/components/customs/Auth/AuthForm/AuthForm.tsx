"use client"
import { z } from "zod";
import Form, { GenerateFormProps } from "../../Form/Form";
import styles from "./AuthForm.module.scss";
import { PropsWithChildren } from "react";
import { userRequestSchema } from "@/libs/schemas/entities/user";

const fields: GenerateFormProps['fields'] = {
    login: {
        label: "Name",
        placeholder: "Enter your name",
        schema: userRequestSchema.shape.login,
        type: "text",
    },
    password: {
        label: "Password",
        placeholder: "Enter your password",
        schema: userRequestSchema.shape.password,
        type: "password",
    },
}

type AuthFormProps = PropsWithChildren< {
    title: string;
    onSubmit: GenerateFormProps['onSubmit'];
    isRegister: boolean;
}>;

const AuthForm = ({ children, title, onSubmit, isRegister }: AuthFormProps) => {
    const finalFields = isRegister ? {
        ...fields,
        confirm_password: {
            ...fields.password,
            label: "Confirm password",
        },
    } : fields;
    
    return (
        <div className={styles.authForm}>
            <h1 className={`h2 ${styles.title}`}>{title}</h1>
            <Form 
                fields={finalFields} 
                onSubmit={onSubmit} 
            />
            {children}
        </div>
    );
};

export default AuthForm;