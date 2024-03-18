"use client";

import Form, { GenerateFormProps } from "@/components/customs/Form/Form";
import { z } from "zod";

const fields: GenerateFormProps['fields'] = {
    name: {
        label: "Name",
        placeholder: "Enter your name",
        schema: z.string().min(3).max(50),
        type: "text",
    },
    email: {
        label: "Email",
        placeholder: "Enter your email",
        schema: z.string().email(),
        type: "email",
    },
    age: {
        label: "Age",
        placeholder: "Enter your age",
        schema: z.number().min(18).max(100),
        type: "number",
        defaultValue: 18
    },
    username: {
        label: "Username",
        placeholder: "Enter your username",
        schema: z.string().min(3).max(50),
        type: "text",
        defaultValue: ""
    },
    types: {
        label: "Types",
        schema: z.string().nonempty(),
        type: "select",
        options: [
            { value: "fire", label: "Fire" },
            { value: "water", label: "Water" },
            { value: "grass", label: "Grass" }
        ],
        defaultValue: "fire",
    },
    description: {
        label: "Description",
        schema: z.string().nonempty(),
        type: "textarea",
        defaultValue: "This is a description"
    },
    isLegendary: {
        label: "Is Legendary",
        schema: z.boolean(),
        type: "checkbox",
        defaultValue: false
    },
    image: {
        label: "Image",
        schema: z.unknown(),
        type: "file",
    }
}


const TestForm = ({}) => {

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
        <div>
            <Form 
                fields={fields} 
                onSubmit={onSubmit} 
            />
        </div>
    );
};

export default TestForm;