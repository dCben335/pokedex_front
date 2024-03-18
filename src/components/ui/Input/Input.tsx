"use client"

import React, { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
    return (
        <input
            className={styles.input}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = "Input";

export default Input;
