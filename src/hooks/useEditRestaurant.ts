import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editRestaurantsService } from "@/services";
import { Restuarant } from "@/models";
import { toast } from "react-toastify";

export const useEditRestaurant = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newRestaurant: Restuarant) => {
      return editRestaurantsService(newRestaurant);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurants"]);
      toast.success("تم تعديل المطعم بنجاح");
      onSuccess();
    },
    onError: () => {
      toast.error("حدث خطأ ما");
    },
  });
};
