import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/auth/changePassword";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export const useChangePassword = () => {
  const navigate = useNavigate();
  const [, setAuthContext] = useAuthContext();
  const { mutate } = useMutation({
    mutationFn: changePassword,

    onMutate: () =>
      toast.loading("Changing password...", { id: "changePassword" }),

    onSuccess: (data) => {
      if (data?.status !== "success") {
        toast.error("Something went wrong", {
          id: "changePassword",
        });
        return;
      }

      if (data?.errors?.length > 0) {
        toast.error(data.errors[0].msg, { id: "changePassword" });
        return;
      }

      toast.success("Password changed", { id: "changePassword" });
      setAuthContext({ JWT: "", role: "", userId: "", username: "" });
      navigate("/login");
    },
  });

  return { mutate };
};
