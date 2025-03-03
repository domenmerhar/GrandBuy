import { useMutation } from "@tanstack/react-query";
import { signup } from "../../api/auth/signup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * useSignup hook za registracijo novega uporabnika.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za registracijo.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: register } = useSignup();
 * register({ email: "user@example.com", password: "password", name: "User Name" });
 */

export const useSignup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("couldntSignUp"), {
          id: "signup",
        });

      navigate("/signup/confirm");
    },
  });
};
