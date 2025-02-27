import { useTranslation } from "react-i18next";
import { TextareaWithLabel } from "../../../Components/TextareaWithLabel";
import { Column } from "../../../Util/Column";
import { Modal } from "../../../Util/Modal";
import { useSearchParams } from "react-router-dom";
import { useJWT } from "../../../hooks/useJWT";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useRespondToRefund } from "../../../hooks/refund/useRespondToRefund";

export const RefundModalDashboard = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { JWT } = useJWT();
  const refundId = searchParams.get("refund-id");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: respondToRefund } = useRespondToRefund();

  const handleClose = () => {
    setSearchParams((prev) => {
      prev.delete("review-id");
      return prev;
    });
  };

  const handleRequestRefund = () => {
    if (
      !messageRef.current?.value ||
      messageRef.current?.value.length < 1 ||
      messageRef.current?.value.length > 255 ||
      !refundId
    )
      return toast.error(t("invalidData"), { id: "request-refund" });

    respondToRefund({ JWT, refundId, reason: messageRef.current.value });

    handleClose();
  };

  return (
    <Modal.Window
      title={t("refundItem")}
      onClose={handleClose}
      buttons={[
        {
          key: "cancel",
          text: t("cancel"),
          color: "red",
          onClick: handleClose,
        },
        {
          key: "submit",
          text: t("submit"),
          color: "green",
          onClick: handleRequestRefund,
        },
      ]}
    >
      <Column $gap="8px">
        <TextareaWithLabel
          label={t("message")}
          id="response"
          ref={messageRef}
          minLength={1}
          maxLength={255}
        />
      </Column>
    </Modal.Window>
  );
};
