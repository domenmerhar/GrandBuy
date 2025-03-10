import { ReviewsPageHeader } from "./ReviewsPageHeader";
import { ReviewsPageOverviewCards } from "./ReviewsPageOverviewCards";
import { Stepper } from "../../../Util/Stepper";
import { DashboardReviews } from "./DashboardReviews";
import useGetSellerReviewCount from "../../../hooks/repliesReviews/useGetSellerReviewCount";
import useGetSellerAverageRating from "../../../hooks/repliesReviews/useGetSellerAverageRating";

const itemPerPage = Number(import.meta.env.VITE_SELLER_REVIEWS_PAGE);

export const ReviewsPage = () => {
  const { data: reviewResponse } = useGetSellerReviewCount();
  const { data: averageRatingResponse } = useGetSellerAverageRating();

  const reviewsCount = reviewResponse?.data?.totalCount || "N/A";
  const averageRating =
    Number(averageRatingResponse?.data?.averageRating?.toFixed(1)) || "N/A";

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
