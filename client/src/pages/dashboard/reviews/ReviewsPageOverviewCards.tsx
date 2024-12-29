import { Row } from "../../../Util/Row";
import { OverviewCard } from "../../../Components/OverviewCard";
import { BiStar } from "react-icons/bi";
import { HiOutlineMicrophone } from "react-icons/hi";
import { FC } from "react";

interface ReviewsPageOverviewCardsProps {
  reviewsCount: number;
  averageRating: number;
}

export const ReviewsPageOverviewCards: FC<ReviewsPageOverviewCardsProps> = ({
  reviewsCount,
  averageRating,
}) => {
  return (
    <Row $gap="1.6rem" $flexWrap="wrap">
      <OverviewCard
        icon={<HiOutlineMicrophone />}
        title="Reviews"
        content={String(reviewsCount)}
      />

      <OverviewCard
        icon={<BiStar />}
        title="Average Rating"
        content={String(averageRating)}
      />
    </Row>
  );
};
