import { BlankCard } from "../../Util/BlankCard";
import { Modal } from "../../Util/Modal";
import { Row } from "../../Util/Row";
import { RatingBreakdown } from "./RatingBreakdown";
import styled from "styled-components";
import { AddReviewButton } from "./AddReviewButton";
import { ReviewSectionHeader } from "./ReviewSectionHeader";
import { ReplyModal } from "./ReplyModal";
import { Reviews } from "./Reviews";

const StyledReviewSection = styled(BlankCard)`
  height: 800px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
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
            <Reviews />

            <ReplyModal />
          </Modal>
        </RatingReviewHolder>

        <AddReviewButton />
      </StyledReviewSection>
    </Modal>
  );
};
