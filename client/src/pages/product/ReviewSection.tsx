import { BlankCard } from "../../Util/BlankCard";
import { Column } from "../../Util/Column";
import { Modal } from "../../Util/Modal";
import { Row } from "../../Util/Row";
import { Review } from "./Review";
import { RatingBreakdown } from "./RatingBreakdown";
import styled from "styled-components";
import { AddReviewButton } from "./AddReviewButton";
import { ReviewSectionHeader } from "./ReviewSectionHeader";
import { ReplyModal } from "./ReplyModal";

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
  return (
    <Modal>
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

            <ReplyModal />
          </Modal>
        </RatingReviewHolder>

        <AddReviewButton />
      </StyledReviewSection>
    </Modal>
  );
};
