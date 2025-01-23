import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/auth/logout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logout,

    onMutate: () => {
      toast.loading("Logging out...", { id: "logout" });
    },

    onSuccess: () => {
      toast.success("Logged out", { id: "logout" });
      navigate("/login");
    },
  });
};
