import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useJWT } from "../../hooks/useJWT";
import { useRequestRefund } from "../../hooks/refund/useRequestRefund";
import { Column } from "../../Util/Column";
import { Modal } from "../../Components/Modal";
import { TextareaWithLabel } from "../../Components/TextareaWithLabel";

export const RefundModal = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { JWT } = useJWT();
  const cartItemId = searchParams.get("cart-item-id");
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const { closeModal } = Modal.useModalContext();

  const { mutate: requestRefund } = useRequestRefund();

  const handleClose = () => {
    setSearchParams((prev) => {
      prev.delete("cart-item-id");
      return prev;
    });

    closeModal();
  };

  const handleRequestRefund = () => {
    if (
      !messageRef.current?.value ||
      messageRef.current?.value.length < 1 ||
      messageRef.current?.value.length > 255 ||
      !cartItemId
    )
      return toast.error(t("invalidData"), { id: "request-refund" });

    requestRefund({ JWT, cartItemId, reason: messageRef.current.value });

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
