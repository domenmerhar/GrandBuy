import { useMutation } from "@tanstack/react-query";
import { updateMe } from "../api/updateMe";
import toast from "react-hot-toast";

export const useUpdateMe = () => {
  const { mutate } = useMutation({
    mutationFn: updateMe,
    onMutate: () => {
      toast.loading("Updating...", { id: "updateMe" });
    },

    onSuccess: (data) => {
      console.log(data);
      if (data.errors)
        return toast.error(data.errors[0].msg, { id: "updateMe" });

      toast.success("Updated data", { id: "updateMe" });
    },
  });

  return { mutate };
};
