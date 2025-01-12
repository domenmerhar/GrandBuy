import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/auth/changePassword";
import toast from "react-hot-toast";

export const useChangePassword = () => {
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
    },
  });

  return { mutate };
};
