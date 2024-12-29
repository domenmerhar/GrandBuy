import { Row } from "../../../Util/Row";
import { ReviewCardDashboard } from "./ReviewCardDashboard";
import { Modal } from "../../../Util/Modal";
import { ReviewsPageHeader } from "./ReviewsPageHeader";
import { ReviewsPageOverviewCards } from "./ReviewsPageOverviewCards";

export const ReviewsPage = () => {
  return (
    <>
      <ReviewsPageHeader />

      <ReviewsPageOverviewCards reviewsCount={10} averageRating={4.5} />

      <Row $alignItems="flex-start">
        <Modal>
          <ReviewCardDashboard />
        </Modal>
      </Row>
    </>
  );
};
