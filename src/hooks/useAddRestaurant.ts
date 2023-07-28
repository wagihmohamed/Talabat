import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRestaurantsService } from "@/services";
import { Restuarant } from "@/models";
import { toast } from "react-toastify";

export const useAddRestaurant = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newRestaurant: Restuarant) => {
      return addRestaurantsService(newRestaurant);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurants"]);
      toast.success("تم اضافة المطعم بنجاح");
      onSuccess();
    },
    onError: () => {
      toast.error("حدث خطأ ما");
    },
  });
};
