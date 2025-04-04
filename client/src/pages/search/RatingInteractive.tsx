import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import styled from "styled-components";

interface RatingInteractiveProps {
  size?: number;
  fontSize?: string;
  allowFraction?: boolean;
}

const StyledRatingInteractive = styled.div`
  & svg {
    width: 3.2rem;
    height: 3.2rem;
  }
`;

/**
 * Komponenta za interaktivno ocenjevanje z zvezdicami.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {number} [props.size=32] - Velikost zvezdic.
 * @param {string} [props.fontSize="1.8rem"] - Velikost pisave za orodna namigovanja.
 * @returns {JSX.Element} JSX element, ki predstavlja interaktivno ocenjevanje z zvezdicami.
 *
 * @example
 * // Uporaba komponente
 * <RatingInteractive size={40} fontSize="2rem" />
 */

export const RatingInteractive: FC<RatingInteractiveProps> = ({
  size = 32,
  fontSize = "1.8rem",
  allowFraction = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tooltipArray = allowFraction
    ? ["0.5", "1.0", "1.5+", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0"]
    : ["1.0", "2.0", "3.0", "4.0", "5.0"];

  const fillColorArray = allowFraction
    ? [
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
      ]
    : ["#f17a45", "#f19745", "#f1a545", "#f1b345", "#f1d045"];

  const handleRating = (rating: number) => {
    setSearchParams((searchParams) => {
      searchParams.set("rating", rating.toString());
      return searchParams;
    });
  };

  return (
    <StyledRatingInteractive>
      <Rating
        onClick={handleRating}
        size={size}
        transition
        allowFraction={allowFraction}
        showTooltip
        tooltipArray={tooltipArray}
        tooltipDefaultText="0"
        fillColorArray={fillColorArray}
        tooltipStyle={{
          backgroundColor: "transparent",
          color: "var(--gray-8)",
          fontWeight: "500",
          fontSize,
          marginLeft: 0,
        }}
        initialValue={
          searchParams.get("rating")
            ? parseFloat(searchParams.get("rating")!)
            : 0
        }
      />
    </StyledRatingInteractive>
  );
};
