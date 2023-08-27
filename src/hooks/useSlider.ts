import { useQuery } from "@tanstack/react-query";
import { getSliderDataService } from "@/services";

export const useSlider = () => {
  return useQuery({
    queryKey: ["sliders"],
    queryFn: getSliderDataService,
  });
};
