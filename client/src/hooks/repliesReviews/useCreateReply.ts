import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import createReply from "../../api/repliesReviews/createReply";

export default () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: createReply,

    onSuccess: (data) => {
      if (data.status !== "success" || data?.errors?.length > 0)
        return toast.error(t("somethingWentWrong"), {
          id: "reply",
        });

      toast.success(t("replySent"), { id: "reply" });
    },
  });
};
