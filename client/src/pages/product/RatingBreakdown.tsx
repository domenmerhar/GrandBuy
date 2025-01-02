import { Column } from "../../Util/Column";
import { ProgressWithLabel } from "../../Components/ProgressWithLabel";
import { AverageRating } from "./AverageRating";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { useReviewStats } from "./useReviewStats";

interface IRatingBreakdown {
  rating: number;
  count: number;
  percentage: number;
}

export const RatingBreakdown = () => {
  const { data, isLoading, error } = useReviewStats();

  if (isLoading) return <SpinnerInBox size="large" />;

  if (error) return <ErrorBox fullPage={false} />;

  const averageRating = data.data.overallStats.avgRating;

  const ratingBreakdowns: IRatingBreakdown[] = Array.from({ length: 5 })
    .map(
      (_, i) =>
        data.data.ratingBreakdown.find(
          (ratingBreakdown: IRatingBreakdown) =>
            ratingBreakdown.rating === i + 1
        ) || { rating: i + 1, count: 0, percentage: 0 }
    )
    .reverse();

  return (
    <Column $gap=".8rem">
      <AverageRating rating={averageRating} />

      {ratingBreakdowns.map((ratingBreakdown) => (
        <ProgressWithLabel
          key={ratingBreakdown.rating}
          value={ratingBreakdown.percentage}
          max={100}
        >
          {`${ratingBreakdown.rating} stars ${ratingBreakdown.percentage}%`}
        </ProgressWithLabel>
      ))}
    </Column>
  );
};
