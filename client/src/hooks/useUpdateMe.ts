import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/user/updateMe";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useJWT } from "./useJWT";

/**
 * useUpdateMe hook za posodobitev uporabniških podatkov.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za posodobitev uporabniških podatkov.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: update } = useUpdateMe();
 * update({ JWT: "your_jwt_token", userData: { username: "newUsername", ... } });
 */

export const useUpdateMe = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { JWT } = useJWT();

  return useMutation({
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
};
