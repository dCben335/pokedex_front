"use client"
import { z } from "zod";
import Form, { GenerateFormProps } from "../../../../components/customs/Form/Form";
import styles from "./AuthForm.module.scss";

const fields: GenerateFormProps['fields'] = {
    login: {
        label: "Name",
        placeholder: "Enter your name",
        schema: z.string().min(1),
        type: "text",
    },
    password: {
        label: "Password",
        placeholder: "Enter your password",
        schema: z.string().min(1),
        type: "password",
    },
}

interface AuthFormProps {
    title: string;
    onSubmit: GenerateFormProps['onSubmit'];
}

const AuthForm = ({title, onSubmit}: AuthFormProps) => {

    return (
        <div className={styles.authForm}>
            <h1 className={`h2 ${styles.title}`}>{title}</h1>
            <Form 
                fields={fields} 
                onSubmit={onSubmit} 
            />
        </div>
    );
};

export default AuthForm;