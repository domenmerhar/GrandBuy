import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/auth/logout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * useLogout hook za odjavo uporabnika.
 *
 * @returns {object} - Vrne objekt z `mutate` funkcijo za odjavo.
 *
 * @example
 * // Uporaba hook-a
 * const { mutate: logoutMutation } = useLogout();
 * logoutMutation({ JWT: "your_jwt_token" });
 */

export const useLogout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,

    onMutate: () => {
      toast.loading(t("loggingOut"), { id: "logout" });
    },

    onSuccess: () => {
      toast.success(t("loggedOut"), { id: "logout" });
      navigate("/login");
    },
  });
};
