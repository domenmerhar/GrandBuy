import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { confirmEmail } from "../../api/auth/confirmEmail";

export const useConfirmEmail = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: confirmEmail,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error("Couldn't confirm email, please try again.", {
          id: "confirmEmail",
        });

      navigate("/login");
    },
  });
};
