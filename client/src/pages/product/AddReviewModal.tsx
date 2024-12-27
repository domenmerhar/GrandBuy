import { Column } from "../../Util/Column";
import { Modal } from "../../Util/Modal";
import { RatingInteractive } from "../search/RatingInteractive";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { TextareaWithLabel } from "../../Components/TextareaWithLabel";

export const AddReviewModal = () => {
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
      title="Post review"
      onBackdropClick={removeRatingParam}
      onCancelReject={removeRatingParam}
      onSubmitApprove={handleSubmit}
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
