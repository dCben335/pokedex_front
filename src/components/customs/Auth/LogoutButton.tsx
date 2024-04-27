"use client"

import { useUser } from "@/components/providers/UserContext";
import Button from "@/components/ui/Button/Button";


interface LogoutButtonProps extends React.HTMLAttributes<HTMLButtonElement> {

}

const LogoutButton = ({...props} : LogoutButtonProps) => {
    const { logout } = useUser();

    return (
        <Button onClick={logout} {...props}>
            Logout
        </Button>
    );
}

export default LogoutButton;
