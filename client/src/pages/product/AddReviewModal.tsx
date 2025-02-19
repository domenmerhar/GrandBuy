import { Column } from "../../Util/Column";
import { Modal } from "../../Util/Modal";
import { RatingInteractive } from "../search/RatingInteractive";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { TextareaWithLabel } from "../../Components/TextareaWithLabel";
import { useTranslation } from "react-i18next";

export const AddReviewModal = () => {
  const { t } = useTranslation();
  const { setIsOpen } = Modal.useModalContext();
  const [, setSearchParams] = useSearchParams();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    removeRatingParam();
    setIsOpen(false);
  };

  const removeRatingParam = () =>
    setSearchParams((searchParams) => {
      searchParams.delete("rating");
      return searchParams;
    });

  return (
    <Modal.Window
      title={t("addReview")}
      onClose={removeRatingParam}
      buttons={[
        {
          key: "cancel",
          text: t("cancel"),
          color: "red",
          onClick: removeRatingParam,
        },
        {
          key: "submit",
          text: t("submit"),
          color: "green",
          onClick: handleSubmit,
        },
      ]}
    >
      <Column $gap="8px" as="form">
        <RatingInteractive size={28} fontSize="1.6rem" />

        <TextareaWithLabel
          id="content"
          label="Content"
          ref={textAreaRef}
          placeholder="Beautiful product. I love it!"
        />
      </Column>
    </Modal.Window>
  );
};
