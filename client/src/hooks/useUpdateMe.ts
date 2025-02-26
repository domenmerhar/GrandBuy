import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/user/updateMe";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useJWT } from "./useJWT";

export const useUpdateMe = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { JWT } = useJWT();

  const { mutate } = useMutation({
    mutationFn: updateMe,
    onMutate: () => {
      toast.loading(t("updating"), { id: "updateMe" });
    },

    onSuccess: (data) => {
      if (data.errors)
        return toast.error(data.errors[0].msg, { id: "updateMe" });

      queryClient.invalidateQueries({ queryKey: ["user-settings", JWT] });
      toast.success(t("updatedData"), { id: "updateMe" });
    },
  });

  return { mutate };
};
