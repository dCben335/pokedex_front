
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, LabelHTMLAttributes } from "react"
import styles from "./GroupForm.module.scss"

export type GroupForm = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string
}

type FormGroupProps = {
    groupForm: GroupForm
    onFieldChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

type Props = FormGroupProps & LabelHTMLAttributes<HTMLLabelElement>

const GroupForm = ({ onFieldChange, className, ...props } : Props) => {
    const { groupForm: formProps, ...newProps } = props
    const { label, ...newGroupForm } = formProps

    return (
        <label className={`${styles.label} ${className ? className : ""}`} {...newProps}>
            {label && <span>{label}</span>}
            <input 
                onChange={onFieldChange && onFieldChange}
                required
                onCopy={undefined} 
                {...newGroupForm} // Use the renamed variable here
            /> 
        </label>
    )
}

export default GroupForm;