import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/auth/signup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * useSignup hook za registracijo uporabnika.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za registracijo.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: signupMutation } = useSignup();
 * signupMutation({ email: "user@example.com", password: "password", username: "username" });
 */

export const useSignup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onMutate: () => {
      toast.loading(t("creatingAccount"), { id: "signup" });
    },

    onSuccess: (data) => {
      if (data?.status !== "success") {
        toast.error(t("somethingWentWrong"), {
          id: "signup",
        });
        return;
      }

      if (data?.errors?.length > 0) {
        toast.error(data.errors[0].msg, { id: "signup" });
        return;
      }

      const message = data?.message;
      const extractedEmail: string = message.match(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
      )[0];

      toast.success(t("createdAccount"), { id: "signup" });
      navigate(`/signup/confirm/${extractedEmail}`);
    },
  });
};
