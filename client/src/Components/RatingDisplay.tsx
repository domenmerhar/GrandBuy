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
  size?: number;
  fontSize?: string;
  showTooltip?: boolean;
}

export const RatingDisplay: FC<RatingDisplayProps> = ({
  rating,
  size = 28,
  fontSize = "1.8rem",
  showTooltip = true,
}) => {
  return (
    <Rating
      size={size}
      transition
      allowFraction
      showTooltip={showTooltip}
      tooltipDefaultText={String(rating)}
      fillColorArray={fillColorArray}
      tooltipStyle={{
        backgroundColor: "transparent",
        color: "var(--gray-8)",
        fontWeight: "500",
        marginLeft: "0",
        fontSize,
      }}
      initialValue={rating}
      readonly
    />
  );
};
