import { Button } from "../../Util/Button";
import { Modal } from "../../Util/Modal";
import styled from "styled-components";
import { AddReviewModal } from "./AddReviewModal";

const PostReviewButton = styled(Button)`
  align-self: flex-end;
`;

export const AddReviewButton = () => {
  const { setIsOpen } = Modal.useModalContext();

  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <>
      <PostReviewButton
        $color="orange"
        $shape="oval"
        $size="large"
        onClick={handleClick}
      >
        Add review
      </PostReviewButton>

      <AddReviewModal />
    </>
  );
};
