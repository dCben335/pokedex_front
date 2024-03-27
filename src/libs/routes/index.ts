import { toast } from "sonner";

export const handleResponse = (response: any, successMessage: string) => {
    if ("error" in response) {
        toast.error(response.error);
        return false
    }
    toast.success(successMessage);
    return true;
}