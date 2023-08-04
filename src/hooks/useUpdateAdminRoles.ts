import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminRoles } from "@/services";
import { AxiosError } from "axios";
import { toast } from 'react-toastify';

export const useUpdateAdminRoles = ({
    onSuccess,
}: {
    onSuccess: () => void
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, roles }: {
            userId: number,
            roles: { [x: string]: boolean; }
        }) => updateAdminRoles(userId, roles),
        onSuccess: () => {
            queryClient.invalidateQueries(['admins']);
            onSuccess();
        },
        onError: (error: AxiosError<{ error: string }>) => {
            toast.error(error.response?.data.error || 'Something went wrong!');
        }
    });
}