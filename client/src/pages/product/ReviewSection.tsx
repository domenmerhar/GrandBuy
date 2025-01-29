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
import { useReviews } from "./useReviews";
import { useSearchParams } from "react-router-dom";
import { useMe } from "../../hooks/useMe";

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
  const [searchParams] = useSearchParams();
  const { data } = useReviews();
  const { data: dataUser } = useMe();

  const role = dataUser?.data?.role;

  const reviewPerPage = Number(import.meta.env.VITE_REVIEWS_PAGE_SIZE);

  const max =
    data?.data?.reviews?.length < reviewPerPage
      ? Number(searchParams.get("page"))
      : null;

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
          {max ? (
            <Stepper searchParamName="page" max={Number(max)} />
          ) : (
            <Stepper searchParamName="page" />
          )}
          {role === "user" ? <AddReviewButton /> : null}
        </ButtonsHolder>
      </StyledReviewSection>
    </Modal>
  );
};
