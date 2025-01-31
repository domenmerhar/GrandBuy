import { useMutation } from "@tanstack/react-query";
import { signup } from "../../api/auth/signup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,

    onSuccess: (data) => {
      console.log(data);

      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error("Couldn't sign up, please try again.", {
          id: "signup",
        });

      navigate("/signup/confirm");
    },
  });
};
