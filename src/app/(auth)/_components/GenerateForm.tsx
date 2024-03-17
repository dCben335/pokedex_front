"use client";

import React from "react";
import Button from "@/components/ui/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodString, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define interface for form field configuration
interface Field {
    label: string;
    placeholder?: string;
    schema: ZodString | ZodType<any>;
}

// Define interfaces for specific input types
interface TextAreaProps extends Field {
    type: "textarea";
    defaultValue?: string;
}

interface SelectProps extends Field { 
    type: "select";
    options?: { 
        value: string | number;
        label: string;
    }[];
    defaultValue?: string | number;
}

interface CheckBoxProps extends Field {
    type: "checkbox";
    defaultValue?: boolean;
}

interface InputProps extends Field {
    type: "text" | "number" | "email" | "file" | "password";
    defaultValue?: string | number;
}

type FormField = TextAreaProps | SelectProps | InputProps | CheckBoxProps;

interface FormData {
    [fieldName: string]: string | number | boolean | any;
}

export interface GenerateFormProps {
    fields: Record<string, FormField>;
    onSubmit: SubmitHandler<FormData>;
}





const generateSchema = (fields: Record<string, FormField>): ZodType<FormData> => {
    const schemaObject: Record<string, ZodType<unknown>> = {};

    for (const fieldName in fields) {
        if (fields[fieldName].schema) {
            schemaObject[fieldName] = fields[fieldName].schema;
        }
    }

    return z.object(schemaObject) as ZodType<FormData>;
};





const GenerateForm = ({ fields, onSubmit }: GenerateFormProps) => {
    const schema: ZodType<FormData> = generateSchema(fields);

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

    
    const defaultValues: FormData = {};
    for (const fieldName in fields) {
        defaultValues[fieldName] = fields[fieldName].defaultValue ?? "";
    }
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
                            type={field.type}
                            defaultValue={field.defaultValue}
                            placeholder={field.placeholder}
                        />
                    )}
                    <p>{(errors[fieldName]?.message as string) ?? ""}</p>
                </div>
            ))}
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Submit"}
            </Button>
        </form>
    );
};

export default GenerateForm;
