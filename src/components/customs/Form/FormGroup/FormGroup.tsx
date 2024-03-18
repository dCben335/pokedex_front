import React from "react";
import { UseFormRegister } from "react-hook-form";
import { ZodString, ZodType } from "zod";
import { ForwardRefExoticComponent } from 'react';

import TextArea from "@/components/ui/TextArea/TextArea"; 
import Select from "@/components/ui/Select/Select"; 
import Checkbox from "@/components/ui/CheckBox/CheckBox"; 
import Input from "@/components/ui/Input/Input"; 
import Label from "@/components/ui/Label/Label";

import styles from "./FormGroup.module.scss";

interface Option {
    value: string | number;
    label: string;
}

interface Field {
    label: string;
    placeholder?: string;
    schema: ZodString | ZodType<any>;
}

interface TextAreaFormProps extends Field {
    type: "textarea";
    defaultValue?: string;
}

interface SelectFormProps extends Field { 
    type: "select";
    options?: Option[];
    defaultValue?: string | number;
}


interface CheckBoxFormProps extends Field {
    type: "checkbox";
    defaultValue?: boolean;
}

export interface InputFormProps extends Field {
    type: "text" | "number" | "email" | "file" | "password";
    defaultValue?: string | number;
}

export type FormFieldProps = TextAreaFormProps | SelectFormProps | CheckBoxFormProps | InputFormProps;

type FormGroupProps = FormFieldProps & {
    className?: string;
    name: string;
    register: UseFormRegister<any>;
    errorMessage?: string;
    options?: undefined | Option[];
}

interface Possibilities {
    [key: string]: ForwardRefExoticComponent<any>;
}

const FormGroup = ({ name, label, type, options, defaultValue, placeholder, register, errorMessage, className }: FormGroupProps) => {
    const possibilities: Possibilities = {
        textarea: TextArea,
        select: Select,
        checkbox: Checkbox,
    }

    const FieldComponent = possibilities[type] ?? Input;

    return (
        <Label name={label} className={`${className ? className: ""}`}>
            <FieldComponent
                {...register(name)}
                defaultValue={defaultValue}
                placeholder={placeholder}
                options={options}
                type={type}
                defaultChecked={type === 'checkbox' ? Boolean(defaultValue) : undefined}
            />
            {errorMessage && <small className={styles.errorMessage}>{errorMessage}</small>}
        </Label>
    );
};

export default FormGroup;

