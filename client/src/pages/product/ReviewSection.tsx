import { useSearchParams } from "react-router-dom";
import { BlankCard } from "../../Util/BlankCard";
import { Column } from "../../Util/Column";
import { Modal } from "../../Util/Modal";
import { Row } from "../../Util/Row";
import { Review } from "./Review";
import { RatingBreakdown } from "./RatingBreakdown";
import styled from "styled-components";
import { AddReviewButton } from "./AddReviewButton";
import { ReviewSectionHeader } from "./ReviewSectionHeader";

const StyledReviewSection = styled(BlankCard)`
  height: 800px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Reviews = styled(Column)`
  overflow-y: auto;
`;

const RatingReviewHolder = styled(Row)`
  flex: 1;
  overflow: hidden;
`;

export const ReviewSection = () => {
  const [, setSearchParams] = useSearchParams();

  const handleReplyClose = () => {
    setSearchParams((searchParams) => {
      searchParams.delete("reply");
      return searchParams;
    });
  };

  return (
    <StyledReviewSection>
      <ReviewSectionHeader />

      <RatingReviewHolder $gap="3.2rem">
        <RatingBreakdown />

        <Modal>
          <Reviews $gap="3.2rem">
            {Array.from({ length: 5 }).map((_, i) => (
              <Review key={i} />
            ))}
          </Reviews>

          <Modal.Window
            title="Reply"
            onCancelReject={handleReplyClose}
            onBackdropClick={handleReplyClose}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
            possimus nesciunt eveniet at vitae officiis, illum architecto animi
            atque nemo qui, ab commodi. Beatae, quod mollitia optio tenetur
            voluptatem molestias.
          </Modal.Window>
        </Modal>
      </RatingReviewHolder>

      <Modal>
        <AddReviewButton />
      </Modal>
    </StyledReviewSection>
  );
};
