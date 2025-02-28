import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import forgotPassword from "../../api/auth/forgotPassword";

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
