import React, { forwardRef, SelectHTMLAttributes } from "react";
import styles from "./Select.module.scss";

interface Option {
    value: string | number;
    label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options?: Option[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ options, ...props }, ref) => {
    return (
        <select className={styles.select} ref={ref} {...props}>
            {(options ?? []).map(({value, label}) => 
                <option className={styles.option} key={value} value={value}>
                    {label}
                </option>
            )}
        </select>
    );
});

Select.displayName = "Select";

export default Select;