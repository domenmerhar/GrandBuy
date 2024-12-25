import { FC } from "react";
import { Rating } from "react-simple-star-rating";

const fillColorArray = [
  "#f17a45",
  "#f17a45",
  "#f19745",
  "#f19745",
  "#f1a545",
  "#f1a545",
  "#f1b345",
  "#f1b345",
  "#f1d045",
  "#f1d045",
];

interface RatingDisplayProps {
  rating: number;
}

export const RatingDisplay: FC<RatingDisplayProps> = ({ rating }) => {
  return (
    <Rating
      size={28}
      transition
      allowFraction
      showTooltip
      tooltipDefaultText={String(rating)}
      fillColorArray={fillColorArray}
      tooltipStyle={{
        backgroundColor: "transparent",
        color: "var(--gray-8)",
        fontWeight: "500",
        fontSize: "1.8rem",
        marginLeft: "0",
      }}
      initialValue={rating}
      readonly
    />
  );
};
