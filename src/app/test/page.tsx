"use client"

import Form, { GenerateFormProps } from "@/components/customs/Form/Form";
import { z } from "zod";

const fields: GenerateFormProps["fields"] = {
    name: {
        type: "text",
        label: "Name",
        schema: z.string().min(3).max(10), 
        placeholder: "mamadou"
    },
    age: {
        type: "number",
        label: "Age",
        schema: z.number().positive(),
        placeholder: "18",
    },
    isStudent: {
        type: "checkbox",
        label: "Is student",
        defaultValue: true,
        schema: z.boolean(),
    },
    types: {
        label: "Type de pokémon",
        type: "select",
        options: [
            {label: "oui", value: "oui"},
            {label: "no", value: "no"}
        ],
        schema: z.string().min(1),
        defaultValue: "oui"
    }
};


const Page = () => {
    const onSubmit: GenerateFormProps["onSubmit"] = async(data) => {
        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(data);
                }, 2000);
            });

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Form fields={fields} onSubmit={onSubmit} />
    )
}

export default Page;