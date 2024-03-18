import { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./Label.module.scss";

type LabelProps = HTMLAttributes<HTMLLabelElement> & PropsWithChildren<{
    name: string;
}> 

const Label = ({ name, children, className, ...props }: LabelProps) => {
    return (
        <label className={`${styles.label} ${className ? className : ""}`} {...props}>
            {name ? <span className={styles.name}>{name}</span> : ""}
            {children}
        </label>
    );
};

Label.displayName = "Label";

export default Label;
