import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { confirmEmail } from "../../api/auth/confirmEmail";
import { useTranslation } from "react-i18next";

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
