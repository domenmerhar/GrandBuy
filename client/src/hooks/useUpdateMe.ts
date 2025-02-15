import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/user/updateMe";
import toast from "react-hot-toast";
import { useMe } from "./useMe";
import { useTranslation } from "react-i18next";

export const useUpdateMe = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data: userData } = useMe();

  const userId = userData?.data?._id;

  const { mutate } = useMutation({
    mutationFn: updateMe,
    onMutate: () => {
      toast.loading(t("updating"), { id: "updateMe" });
    },

    onSuccess: (data) => {
      console.log(data);
      if (data.errors)
        return toast.error(data.errors[0].msg, { id: "updateMe" });

      queryClient.invalidateQueries({ queryKey: ["user-settings", userId] });
      toast.success(t("updatedData"), { id: "updateMe" });
    },
  });

  return { mutate };
};
