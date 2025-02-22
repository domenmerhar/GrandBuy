import { ReviewsPageHeader } from "./ReviewsPageHeader";
import { ReviewsPageOverviewCards } from "./ReviewsPageOverviewCards";
import { Stepper } from "../../../Util/Stepper";
import { DashboardReviews } from "./DashboardReviews";
import useGetSellerReviewCount from "../../../hooks/repliesReviews/useGetSellerReviewCount";
import useGetSellerAverageRating from "../../../hooks/repliesReviews/useGetSellerAverageRating";

export const ReviewsPage = () => {
  const { data: reviewResponse } = useGetSellerReviewCount();
  const { data: averageRatingResponse } = useGetSellerAverageRating();

  const reviewsCount = reviewResponse?.data?.totalCount || 0;
  const averageRating =
    Number(averageRatingResponse?.data?.averageRating?.toFixed(1)) || 0;

  return (
    <>
      <ReviewsPageHeader />

      <ReviewsPageOverviewCards
        reviewsCount={reviewsCount}
        averageRating={averageRating}
      />
      <DashboardReviews />

      <Stepper searchParamName="page" />
    </>
  );
};
