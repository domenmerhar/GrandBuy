import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/auth/logout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
