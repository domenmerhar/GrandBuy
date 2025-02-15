import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "../api/auth/changePassword";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

export const useChangePassword = () => {
  const { t } = useTranslation();
  const { JWT, clearAuthInfo } = useAuthContext();
  const client = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: changePassword,

    onMutate: () =>
      toast.loading(t("changingPassword"), { id: "changePassword" }),

    onSuccess: (data) => {
      if (data?.status !== "success") {
        toast.error(t("somethingWentWrong"), {
          id: "changePassword",
        });
        return;
      }

      if (data?.errors?.length > 0) {
        toast.error(data.errors[0].msg, { id: "changePassword" });
        return;
      }

      toast.success(t("passwordChanged"), { id: "changePassword" });
      client.invalidateQueries({ queryKey: ["user-settings", JWT] });
      clearAuthInfo();
      navigate("/login");
    },
  });

  return { mutate };
};
