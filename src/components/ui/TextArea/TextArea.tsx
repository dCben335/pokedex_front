import React, { forwardRef, TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.scss";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ ...props }, ref) => {
    return (
        <textarea 
            className={styles.textArea}
            ref={ref} 
            cols={30}
            rows={10}
            {...props} 
        />
    );
});

TextArea.displayName = "TextArea";

export default TextArea;