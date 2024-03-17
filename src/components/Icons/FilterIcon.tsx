import { IconProps } from "./Logo"

const FilterIcon = ({...props}: IconProps) => {
    return (
        <svg enableBackground="new 0 0 32 32" viewBox="0 0 32 32"  xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M3.241,7.646L13,19v9l6-4v-5l9.759-11.354C29.315,6.996,28.848,6,27.986,6H4.014C3.152,6,2.685,6.996,3.241,7.646z" strokeWidth="2" />
        </svg>
    )
}

export default FilterIcon