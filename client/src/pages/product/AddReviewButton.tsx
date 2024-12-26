import { Button } from "../../Util/Button";
import { Modal } from "../../Util/Modal";
import styled from "styled-components";

const PostReviewButton = styled(Button)`
  margin-top: 12px;
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

      <Modal.Window title="Post review">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
        possimus nesciunt eveniet at vitae officiis, illum architecto animi
        atque nemo qui, ab commodi. Beatae, quod mollitia optio tenetur
        voluptatem molestias.
      </Modal.Window>
    </>
  );
};
