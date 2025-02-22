import { ReviewsPageHeader } from "./ReviewsPageHeader";
import { ReviewsPageOverviewCards } from "./ReviewsPageOverviewCards";
import { Stepper } from "../../../Util/Stepper";
import { DashboardReviews } from "./DashboardReviews";
import useGetSellerReviewCount from "../../../hooks/repliesReviews/useGetSellerReviewCount";
import useGetSellerAverageRating from "../../../hooks/repliesReviews/useGetSellerAverageRating";

const itemPerPage = Number(import.meta.env.VITE_PRODUCTS_PER_STEPPER);

export const ReviewsPage = () => {
  const { data: reviewResponse } = useGetSellerReviewCount();
  const { data: averageRatingResponse } = useGetSellerAverageRating();

  const reviewsCount = reviewResponse?.data?.totalCount || 0;
  const averageRating =
    Number(averageRatingResponse?.data?.averageRating?.toFixed(1)) || 0;

  const max = Math.ceil(reviewsCount / itemPerPage);

  return (
    <>
      <ReviewsPageHeader />

      <ReviewsPageOverviewCards
        reviewsCount={reviewsCount}
        averageRating={averageRating}
      />
      <DashboardReviews />

      <Stepper searchParamName="page" max={max} />
    </>
  );
};
