import { Column } from "../../Util/Column";
import { ProgressWithLabel } from "../../Components/ProgressWithLabel";
import { AverageRating } from "./AverageRating";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { useReviewStats } from "./useReviewStats";
import { useTranslation } from "react-i18next";

/**
 * Komponenta za prikaz razčlenitve ocen.
 *
 * @component
 * @returns {JSX.Element} JSX element, ki predstavlja razčlenitev ocen.
 *
 * @example
 * // Uporaba komponente
 * <RatingBreakdown />
 */

export const RatingBreakdown = () => {
  const { t } = useTranslation();
  const { isLoading, error, averageRating, ratingBreakdowns } =
    useReviewStats();

  if (isLoading) return <SpinnerInBox size="large" />;

  if (error) return <ErrorBox fullPage={false} />;

  return (
    <Column $gap=".8rem">
      <AverageRating rating={averageRating} />

      {ratingBreakdowns.map((ratingBreakdown) => (
        <ProgressWithLabel
          key={ratingBreakdown.rating}
          value={ratingBreakdown.percentage}
          max={100}
        >
          {`${ratingBreakdown.rating} ${t("stars")} ${ratingBreakdown.percentage}%`}
        </ProgressWithLabel>
      ))}
    </Column>
  );
};
