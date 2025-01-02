import { BlankCard } from "../../Util/BlankCard";
import { Modal } from "../../Util/Modal";
import { Row } from "../../Util/Row";
import { RatingBreakdown } from "./RatingBreakdown";
import styled from "styled-components";
import { AddReviewButton } from "./AddReviewButton";
import { ReviewSectionHeader } from "./ReviewSectionHeader";
import { ReplyModal } from "./ReplyModal";
import { Reviews } from "./Reviews";
import { Stepper } from "../../Util/Stepper";

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

const ButtonsHolder = styled(Row)`
  align-self: flex-end;
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

        <ButtonsHolder $alignItems="center" $gap="1.2rem">
          <Stepper searchParamName="page" />
          <AddReviewButton />
        </ButtonsHolder>
      </StyledReviewSection>
    </Modal>
  );
};
