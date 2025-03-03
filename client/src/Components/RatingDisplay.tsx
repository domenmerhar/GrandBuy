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

/**
 * RatingDisplay komponenta za prikaz ocen z zvezdicami.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {number} props.rating - Ocena, ki se prikaže.
 * @param {number} [props.size=28] - Velikost zvezdic.
 * @param {string} [props.fontSize="1.8rem"] - Velikost pisave orodnega namiga.
 * @param {boolean} [props.showTooltip=true] - Ali naj se prikaže orodni namig z oceno.
 * @returns {JSX.Element} - JSX element ocen z zvezdicami.
 *
 * @example
 * // Uporaba komponente
 * <RatingDisplay rating={4.5} />
 */

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
