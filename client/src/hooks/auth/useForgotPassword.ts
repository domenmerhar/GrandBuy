import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import forgotPassword from "../../api/auth/forgotPassword";

/**
 * useForgotPassword hook za pošiljanje zahteve za pozabljeno geslo.
 *
 * @param {string} email - E-poštni naslov uporabnika, ki je pozabil geslo.
 * @returns {object} - Vrne objekt z `mutate` funkcijo za pošiljanje zahteve za pozabljeno geslo.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: resetPassword } = useForgotPassword("user@example.com");
 * resetPassword({ email: "user@example.com" });
 */

export const useForgotPassword = (email: string) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: forgotPassword,

    onSuccess: (data) => {
      console.log(data);
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("somethingWentWrong"), {
          id: "signup",
        });

      navigate(`/forgot-password/confirm/${email}`);
    },
  });
};
