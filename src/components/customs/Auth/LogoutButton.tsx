
import { deleteCookies, getCookies } from "@/actions/cookies";
import { navigate } from "@/actions/navigate";
import Button from "@/components/ui/Button/Button";
import { toast } from "sonner";

interface LogoutButtonProps extends React.HTMLAttributes<HTMLButtonElement> {

}

const LogoutButton = ({...props} : LogoutButtonProps) => {
    const logout = async () =>  {
        await deleteCookies();
        await navigate('/');
        toast.success("Logout successfully");
    };

    return (
        <Button onClick={logout} {...props}>
            Logout
        </Button>
    );
}

export default LogoutButton;
