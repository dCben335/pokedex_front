"use client";

import React from "react";
import Button from "@/components/ui/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormGroup, { FormFieldProps } from "./FormGroup/FormGroup";
import styles from "./Form.module.scss";

export interface FormData {
    [fieldName: string]: string | number | boolean | any;
}

export interface GenerateFormProps {
    fields: Record<string, FormFieldProps>;
    onSubmit: SubmitHandler<FormData>;
}


const extractSchema = (fields: Record<string, FormFieldProps>): ZodType<FormData> => {
    const schemaObject: Record<string, ZodType<unknown>> = {};

    for (const fieldName in fields) {
        if (fields[fieldName].schema) {
            schemaObject[fieldName] = fields[fieldName].schema;
        }
    }

    return z.object(schemaObject) as ZodType<FormData>;
};


const Form = ({ fields, onSubmit }: GenerateFormProps) => {
    const schema: ZodType<FormData> = extractSchema(fields);

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
    } = useForm<FormData>(
        { resolver: customResolver, defaultValues: defaultValues}
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {Object.entries(fields).map(([fieldName, field]) => (
                <FormGroup
                    key={fieldName}
                    {...field}
                    name={fieldName}
                    register={register}
                    errorMessage={(errors[fieldName]?.message) as string}
                />
            ))}
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Submit"}
            </Button>
        </form>
    );
};

export default Form;
