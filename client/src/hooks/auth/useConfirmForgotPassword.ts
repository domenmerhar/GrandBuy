import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import confirmForgotPassword from "../../api/auth/confirmForgotPassword";

/**
 * useConfirmForgotPassword hook za potrditev pozabljenega gesla.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za potrditev pozabljenega gesla.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: confirmPasswordReset } = useConfirmForgotPassword();
 * confirmPasswordReset({ token: "your_reset_token", password: "newPassword" });
 */

export const useConfirmForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: confirmForgotPassword,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("somethingWentWrong"), {
          id: "signup",
        });

      navigate(`/login`);
    },
  });
};
