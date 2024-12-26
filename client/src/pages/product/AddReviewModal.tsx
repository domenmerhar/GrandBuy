import styled from "styled-components";
import { Column } from "../../Util/Column";
import { Label } from "../../Util/Label";
import { Modal } from "../../Util/Modal";
import { RatingInteractive } from "../search/RatingInteractive";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";

const TextareaLabel = styled(Label)`
  margin-bottom: -4px;
`;

const Textarea = styled.textarea`
  border-radius: 15px;
  border: none;
  padding: 1rem 1.5rem;
  font-weight: 400;
  resize: vertical;
  min-height: 10rem;
  max-height: 80%;
`;

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

        <TextareaLabel htmlFor="review">Review</TextareaLabel>
        <Textarea
          id="review"
          placeholder="Write your review here"
          ref={textAreaRef}
        />
      </Column>
    </Modal.Window>
  );
};
