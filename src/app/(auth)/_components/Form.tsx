import React from "react";
import Button from "@/components/ui/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define types for input field types
type InputType = "text" | "number" | "email" | "textarea" | "checkbox"; // Add checkbox type

// Define types for form field configuration
interface FormField {
    label: string;
    placeholder: string;
    type: InputType;
    schema: ZodType<any>;
    defaultValue: string | number | boolean; // Update defaultValue type
}

// Define type for form data
interface FormData {
    [fieldName: string]: string | number | boolean; // Update type to allow boolean for checkbox
}

// Define a function to generate the Zod schema from form field configuration
const generateSchema = (fields: Record<string, FormField>) => {
    const schemaObject: Record<string, ZodType<any>> = {};

    for (const fieldName in fields) {
        schemaObject[fieldName] = fields[fieldName].schema;
    }

    return z.object(schemaObject);
};

// Define a function to generate the form component
const generateForm = (
    fields: Record<string, FormField>,
    onSubmit: SubmitHandler<FormData>
) => {
    // Generate default values for form fields
    const defaultValues: FormData = {};
    for (const fieldName in fields) {
        defaultValues[fieldName] = fields[fieldName].defaultValue;
    }

    // Generate Zod schema for form validation
    const schema = generateSchema(fields);

    // Define custom resolver to handle number inputs
    const customResolver = async (values: FormData, context: any, options: any) => {
        const parsedData: FormData = {};
        for (const key in values) {
            // Convert value to number if input type is "number"
            parsedData[key] =
                fields[key].type === "number" ? parseFloat(values[key] as string) : values[key];
        }
        return await zodResolver(schema)(parsedData, context, options);
    };

    return () => {
        const {
            register,
            handleSubmit,
            formState: { errors, isSubmitting }
        } = useForm<FormData>({
            resolver: customResolver,
            defaultValues: defaultValues
        });

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                {Object.entries(fields).map(([fieldName, field]) => (
                    <div key={fieldName}>
                        <label>{field.label}</label>
                        {field.type === "checkbox" ? ( // Render checkbox for checkbox type
                            <input
                                {...register(fieldName)}
                                type="checkbox"
                                defaultChecked={field.defaultValue as boolean} // Set defaultChecked for checkbox
                            />
                        ) : field.type === "textarea" ? ( // Render textarea for textarea type
                            <textarea
                                {...register(fieldName)}
                                defaultValue={field.defaultValue as string} // Set defaultValue for textarea
                                placeholder={field.placeholder}
                            />
                        ) : ( // Render input for other types
                            <input
                                {...register(fieldName)}
                                type={field.type === "number" ? "number" : "text"} // Ensure correct type for number input
                                defaultValue={field.defaultValue as string} // Set defaultValue for text and number inputs
                                placeholder={field.placeholder}
                            />
                        )}
                        <p>{errors[fieldName]?.message}</p>
                    </div>
                ))}
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Loading..." : "Submit"}
                </Button>
            </form>
        );
    };
};

// Example usage
const MyForm = generateForm(
    {
        name: {
            label: "Name",
            placeholder: "Enter your name",
            type: "text",
            schema: z.string().min(3),
            defaultValue: "John Doe"
        },
        age: {
            label: "Age",
            placeholder: "Enter your age",
            type: "number",
            schema: z.number().min(18),
            defaultValue: 18
        },
        email: {
            label: "Email",
            placeholder: "Enter your email",
            type: "email",
            schema: z.string().email(),
            defaultValue: "john@example.com"
        },
        message: { // Example textarea field
            label: "Message",
            placeholder: "Enter your message",
            type: "textarea",
            schema: z.string(),
            defaultValue: ""
        },
        agree: { // Example checkbox field
            label: "Agree to terms",
            placeholder: "",
            type: "checkbox", // Set type as "checkbox"
            schema: z.boolean(),
            defaultValue: false // Set default value for checkbox
        }
    },
    async (data) => {
        console.log("Form data submitted:", data);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Submission successful!");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }
);

const Test = () => {
   

    return (
        <div>
            <h1>My Form</h1>
            <MyForm />
        </div>
    );
};

export default Test;
