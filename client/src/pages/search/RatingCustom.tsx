import { useState } from "react";
import { Rating } from "react-simple-star-rating";

const tooltipArray = [
  "0.5+",
  "1.0+",
  "1.5+",
  "2.0+",
  "2.5+",
  "3.0+",
  "3.5+",
  "4.0+",
  "4.5+",
  "5.0",
];

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

export const RatingCustom = () => {
  const [rating, setRating] = useState<number>(0);
  const handleRating = (rate: number) => setRating(rate);

  console.log(rating);

  return (
    <Rating
      onClick={handleRating}
      size={32}
      transition
      allowFraction
      showTooltip
      tooltipArray={tooltipArray}
      tooltipDefaultText="0+"
      fillColorArray={fillColorArray}
      tooltipStyle={{
        backgroundColor: "transparent",
        color: "var(--gray-8)",
        fontWeight: "500",
        fontSize: "1.8rem",
      }}
    />
  );
};
