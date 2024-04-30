import ArrowBack from "@/components/Icons/ArrowBack";
import Button, { LinkProps } from "../Button/Button";
import styles from "./ButtonGoBack.module.scss";
import { PropsWithChildren } from "react";

type ButtonGoBackProps = Omit<LinkProps, "renderAs"> & PropsWithChildren<{

}>


const ButtonGoBack = ({ children, ...props }: ButtonGoBackProps) => {
    return (
        <Button renderAs="link" className={styles.goBack} {...props}>
            <ArrowBack className={styles.icon} />            
        </Button>
    )
}

export default ButtonGoBack