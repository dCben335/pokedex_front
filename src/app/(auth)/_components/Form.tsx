import React from "react";
import Button from "@/components/ui/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define types for input field types
type InputType = "text" | "number" | "email" | "textarea" | "checkbox" | "select";

// Define types for form field configuration
interface FormField {
    label: string;
    placeholder?: string;
    type: InputType;
    options?: { value: string | number; label: string }[];
    schema?: ZodType<any>; // Add schema for validation
    defaultValue?: string | number | boolean;
}

// Define type for form data
interface FormData {
    [fieldName: string]: string | number | boolean;
}

// Define a function to generate the Zod schema from form field configuration
const generateSchema = (fields: Record<string, FormField>) => {
    const schemaObject: Record<string, ZodType<any>> = {};

    for (const fieldName in fields) {
        if (fields[fieldName].schema) {
            schemaObject[fieldName] = fields[fieldName].schema;
        }
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
        defaultValues[fieldName] = fields[fieldName].defaultValue ?? "";
    }

    // Generate Zod schema for form validation
    const schema = generateSchema(fields);

    // Define custom resolver to handle number inputs
    const customResolver = async (values: FormData, context: any, options: any) => {
        const parsedData: FormData = {};
        for (const key in values) {
            parsedData[key] = fields[key].type === "number"
                ? parseFloat(values[key] as string)
                : fields[key].type === "checkbox"
                    ? Boolean(values[key])
                    : values[key];
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
                        {field.type === "textarea" ? (
                            <textarea
                                {...register(fieldName)}
                                defaultValue={field.defaultValue}
                                placeholder={field.placeholder}
                            />
                        ) : field.type === "select" ? (
                            <select {...register(fieldName)} defaultValue={field.defaultValue}>
                                {field.options?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === "checkbox" ? (
                            <input
                                type="checkbox"
                                {...register(fieldName)}
                                defaultChecked={Boolean(field.defaultValue)}
                            />
                        ) : (
                            <input
                                {...register(fieldName)}
                                type={field.type === "number" ? "number" : "text"}
                                defaultValue={field.defaultValue}
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
            type: "text",
            schema: z.string().min(3),
            defaultValue: "John Doe"
        },
        age: {
            label: "Age",
            type: "number",
            schema: z.number().min(18),
            defaultValue: 18
        },
        email: {
            label: "Email",
            type: "email",
            schema: z.string().email(),
            defaultValue: "john@example.com"
        },
        message: {
            label: "Message",
            type: "textarea",
            defaultValue: ""
        },
        acceptTerms: {
            label: "Accept Terms",
            type: "checkbox",
            defaultValue: false
        },
        gender: {
            label: "Gender",
            type: "select",
            options: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" }
            ],
            schema: z.string(),
            defaultValue: ""
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
