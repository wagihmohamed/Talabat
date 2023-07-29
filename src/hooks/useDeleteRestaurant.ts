import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRestaurantsService } from "@/services";
import { toast } from "react-toastify";

export const useDeleteRestaurant = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (restaurantId: number) => {
      return deleteRestaurantsService(restaurantId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurants"]);
      toast.success("تم حذف المطعم بنجاح");
      onSuccess();
    },
    onError: () => {
      toast.error("حدث خطأ ما");
    },
  });
};
