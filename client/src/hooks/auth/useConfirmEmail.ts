import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { confirmEmail } from "../../api/auth/confirmEmail";
import { useTranslation } from "react-i18next";

/**
 * useConfirmEmail hook za potrditev e-poštnega naslova uporabnika.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za potrditev e-pošte.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: confirm } = useConfirmEmail();
 * confirm({ token: "your_confirmation_token" });
 */

export const useConfirmEmail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: confirmEmail,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("couldntConfirmEmail"), {
          id: "confirmEmail",
        });

      navigate("/login");
    },
  });
};
