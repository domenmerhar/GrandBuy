import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/auth/signup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: signup,
    onMutate: () => {
      toast.loading("Creating account...", { id: "signup" });
    },

    onSuccess: (data) => {
      if (data?.status !== "success") {
        toast.error("Something went wrong", {
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

      toast.success("Created account", { id: "signup" });
      navigate(`/signup/confirm/${extractedEmail}`);
    },
  });

  return { mutate };
};
