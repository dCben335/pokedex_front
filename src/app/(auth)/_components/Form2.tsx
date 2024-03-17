import React from "react";
import Button from "@/components/ui/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";
import { ZodType } from "zod";

type SchemaData = {[key: string]: any}

interface FormProps<T extends FieldValues> {
    schema: ZodType<T, SchemaData>
    onSubmit: SubmitHandler<T>;
}

const Form = <T extends SchemaData>({ schema, onSubmit }: FormProps<T>) => {
    const { 
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<T>({
        resolver: zodResolver(schema)
    });

    const fieldNames = Object.keys(schema._def.shape()) as Path<T>[]

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fieldNames.map((fieldName: Path<T>) => (
                <label key={fieldName}>
                    <input type="text" {...register(fieldName)}/>
                    <p>{errors[fieldName]?.message?.toString() ?? ""}</p>
                </label>
            ))}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Submit"}
            </Button>
        </form>
    );
};

export default Form;
