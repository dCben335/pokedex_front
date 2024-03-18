"use client"

import Form, { GenerateFormProps } from "@/components/customs/Form/Form";
import { z } from "zod";

const fields: GenerateFormProps['fields'] = {
    bamboula: {
        label: "Bamboula",
        schema: z.boolean(),
        type: "checkbox",
        defaultValue: true
    },
    password: {
        label: "Password",
        placeholder: "Enter your password",
        schema: z.string().min(1),
        type: "password",
    },
    login: {
        label: "Name",
        placeholder: "Enter your name",
        schema: z.string().min(3).max(50),
        type: "text",
    },
    types: {
        type: "select",
        label: "Type",
        options: [
            { value: "1", label: "First option" },
            { value: "2", label: "Second option" },
            { value: "3", label: "Third option" },
        ],
        defaultValue: "2",
        schema: z.string().min(1),
    }
}

const Page = () => {
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
        <main>
            <Form fields={fields} onSubmit={onSubmit}/>
        </main>
    )
}

export default Page;