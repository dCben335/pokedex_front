import React, { forwardRef, InputHTMLAttributes } from "react";
import styles from "./CheckBox.module.scss";

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {

}

const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(({ ...props }, ref) => {
    return (
        <input 
            className={styles.checkBox}
            type="checkbox" 
            ref={ref} 
            {...props} 
        />
    );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
