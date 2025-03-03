import { useTranslation } from "react-i18next";
import { TextareaWithLabel } from "../../../Components/TextareaWithLabel";
import { Column } from "../../../Util/Column";
import { Modal } from "../../../Components/Modal";
import { useSearchParams } from "react-router-dom";
import { useJWT } from "../../../hooks/useJWT";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useRespondToRefund } from "../../../hooks/refund/useRespondToRefund";

export const RefundModalDashboard = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { closeModal } = Modal.useModalContext();

  const { JWT } = useJWT();
  const refundId = searchParams.get("refund-id")!;
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: respondToRefund } = useRespondToRefund();

  const handleClose = () => {
    setSearchParams((prev) => {
      prev.delete("refund-id");
      return prev;
    });

    closeModal();
  };

  const handleAction = (callback: () => unknown) =>
    function () {
      if (
        !messageRef.current?.value.length ||
        messageRef.current?.value.length < 1 ||
        messageRef.current?.value.length > 255 ||
        !refundId
      )
        return toast.error(t("invalidData"), { id: "request-refund" });

      callback();
      handleClose();
    };

  const handleCancelRefund = handleAction(() =>
    respondToRefund({
      JWT,
      refundId,
      status: "rejected",
      resolvedMessage: messageRef!.current!.value,
    })
  );

  const handleSubmitRefund = handleAction(() =>
    respondToRefund({
      JWT,
      refundId,
      status: "approved",
      resolvedMessage: messageRef!.current!.value,
    })
  );

  return (
    <Modal.Window
      title={t("refundItem")}
      onClose={handleClose}
      buttons={[
        {
          key: "cancel",
          text: t("cancel"),
          color: "red",
          onClick: handleCancelRefund,
        },
        {
          key: "submit",
          text: t("submit"),
          color: "green",
          onClick: handleSubmitRefund,
        },
      ]}
    >
      <Column $gap="8px">
        <TextareaWithLabel
          label={t("message")}
          id="message"
          ref={messageRef}
          minLength={1}
          maxLength={255}
        />
      </Column>
    </Modal.Window>
  );
};
