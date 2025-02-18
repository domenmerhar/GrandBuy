import { useTranslation } from "react-i18next";
import { Modal } from "../../Util/Modal";
import { useSearchParams } from "react-router-dom";

export const ReplyModal = () => {
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();

  const handleReplyClose = () => {
    setSearchParams((searchParams) => {
      searchParams.delete("reply");
      return searchParams;
    });
  };

  return (
    <Modal.Window
      title={t("reply")}
      onClose={handleReplyClose}
      negativeButton={{
        text: t("cancel"),
        color: "red",
        onClick: handleReplyClose,
      }}
    >
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
      possimus nesciunt eveniet at vitae officiis, illum architecto animi atque
      nemo qui, ab commodi. Beatae, quod mollitia optio tenetur voluptatem
      molestias.
    </Modal.Window>
  );
};
