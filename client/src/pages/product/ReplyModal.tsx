import { useTranslation } from "react-i18next";
import { Modal } from "../../Components/Modal";
import { useSearchParams } from "react-router-dom";
import { TextareaWithLabel } from "../../Components/TextareaWithLabel";
import { Column } from "../../Util/Column";
import { useRef } from "react";
import toast from "react-hot-toast";
import useCreateReply from "../../hooks/repliesReviews/useCreateReply";
import { useJWT } from "../../hooks/useJWT";

/**
 * Komponenta za odgovor v modalnem oknu.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja modalno okno za odgovor.
 *
 * @example
 * // Uporaba komponente
 * <ReplyModal />
 */

export const ReplyModal = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate: createReply } = useCreateReply();
  const { JWT } = useJWT();
  const { closeModal } = Modal.useModalContext();

  const reviewId = searchParams.get("reply")!;

  const removeParam = () => {
    setSearchParams((searchParams) => {
      searchParams.delete("reply");
      return searchParams;
    });
  };

  const handleCancel = () => {
    removeParam();
    closeModal();
  };

  const handleReply = () => {
    removeParam();
    if (!reviewRef.current?.value?.trim())
      return toast.error(t("pleaseEnterAllFields"), { id: "reply" });

    createReply({ JWT, reviewId, reply: reviewRef.current.value });
    closeModal();
  };

  const reviewRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Modal.Window
      title={t("reply")}
      onClose={removeParam}
      buttons={[
        {
          key: "cancel",
          text: t("cancel"),
          color: "red",
          onClick: handleCancel,
        },
        {
          key: "reply",
          text: t("reply"),
          color: "green",
          onClick: handleReply,
        },
      ]}
    >
      <Column $gap=".8rem">
        <TextareaWithLabel
          id="review"
          label={t("replyText")}
          ref={reviewRef}
          maxLength={500}
        />
      </Column>
    </Modal.Window>
  );
};
