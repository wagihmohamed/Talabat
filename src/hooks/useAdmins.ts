import { useQuery } from "@tanstack/react-query";
import { getAdminsService } from "@/services";

export const useAdmins = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: getAdminsService,
  });
};
