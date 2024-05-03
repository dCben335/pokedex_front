import Button from "@/components/ui/Button/Button";
import { toast } from "sonner";

interface LogoutButtonProps extends React.HTMLAttributes<HTMLButtonElement> {

}

const LogoutButton = ({...props} : LogoutButtonProps) => {
    const logout = async () =>  {
        toast.success("Logout successfully");
    };

    return (
        <Button onClick={logout} {...props}>
            Logout
        </Button>
    );
}

export default LogoutButton;
