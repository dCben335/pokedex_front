"use client";

import React from "react";
import Form from "./Form"; // Import the generic form component
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

const AuthFormSchema = z.object({
    login: z.string().max(10),
    password: z.string().default("test"),

});

type AuthFormFields = z.infer<typeof AuthFormSchema>;

const AuthForm = () => {
    const onSubmit: SubmitHandler<AuthFormFields> = async (data) => {
        console.log(data);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form 
            schema={AuthFormSchema} 
            onSubmit={onSubmit} 
        />
    )
};

export default AuthForm;
