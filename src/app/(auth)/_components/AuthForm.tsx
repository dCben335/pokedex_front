"use client";

import { ZodType, z } from "zod";
import GenerateForm, { GenerateFormProps } from "./GenerateForm";

interface FormData {
    name: string;
    email: string;
    age: number;
}

// Define the field configurations
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
    }
}


// Define the component where you want to use the GenerateForm component
const MyFormComponent = () => {
    
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
            <h1>My Form</h1>
            {/* Render the GenerateForm component and pass the required props */}
            <GenerateForm fields={fields} onSubmit={onSubmit} />
        </div>
    );
};

export default MyFormComponent;