"use client"

import Form, { GenerateFormProps } from "@/components/customs/Form/Form";
import { createArrayOfObjects } from "@/utils/reformat";
import { useState } from "react";
import { z } from "zod";

const fields: GenerateFormProps['fields'] = {
    test: {
        label: "Test",
        type: "text",
        schema: z.string().min(1),
        defaultValue: "mamaadou",
    },
    "regions-0-name": {
        label: "Regions",
        type: "select",
        schema: z.string().min(1),
        options: [
            { label: "Kanto", value: "kanto" },
            { label: "Johto", value: "johto" },
            { label: "Hoenn", value: "hoenn" },
            { label: "Sinnoh", value: "sinnoh" },
            { label: "Unova", value: "unova" },
            { label: "Kalos", value: "kalos" },
            { label: "Alola", value: "alola" },
            { label: "Galar", value: "galar" },
        ],
        defaultValue: "kanto",
    },
    "regions-0-number": {
        label: "Number",
        type: "number",
        schema: z.number().min(1),
        defaultValue: 1,
    },
    "regions-0-description": {
        label: "Description",
        type: "textarea",
        schema: z.string().min(1),
        defaultValue: "mamaadou",
    },
    "regions-0-legendary": {
        label: "Legendary",
        type: "checkbox",
        schema: z.boolean(),
        defaultValue: true,
    },
}



const Page = () => {
    const [counter, setCounter] = useState(0);
    const [formfields, setFormFields] = useState(fields);

    const removeRegions = () => {
        if (counter === 0) return;

        const newFields = { ...formfields };
        delete newFields[`regions-${counter}-name`];
        delete newFields[`regions-${counter}-number`];

        setFormFields(newFields);
        setCounter((prev) => prev - 1);
    }

    const addRegions = () => {
        const newCounter = counter + 1;
        setCounter(newCounter);
        setFormFields({
            ...formfields,
            [`regions-${newCounter}-name`]: {
                ...fields["regions-0-name"]
            },
            [`regions-${newCounter}-number`]: {
                ...fields["regions-0-number"]
            },
            [`regions-${newCounter}-description`]: {
                ...fields["regions-0-description"]
            },
            [`regions-${newCounter}-legendary`]: {
                ...fields["regions-0-legendary"]
            },
        });
    }


    const onSubmit: GenerateFormProps['onSubmit'] = async (data) => {
        try {

            const result = createArrayOfObjects(data);
            
            
            console.log("Submitting form data:", result);
            
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
            <button onClick={() => addRegions()}>Add field</button>
            <button onClick={() => removeRegions()}>Remove</button>
            <Form fields={formfields} onSubmit={onSubmit}/>
        </main>
    )
}

export default Page;