import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/user/updateMe";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/AuthContext";

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  const [{ userId }] = useAuthContext();

  const { mutate } = useMutation({
    mutationFn: updateMe,
    onMutate: () => {
      toast.loading("Updating...", { id: "updateMe" });
    },

    onSuccess: (data) => {
      console.log(data);
      if (data.errors)
        return toast.error(data.errors[0].msg, { id: "updateMe" });

      queryClient.invalidateQueries({ queryKey: ["user-settings", userId] });
      toast.success("Updated data", { id: "updateMe" });
    },
  });

  return { mutate };
};
