import { Column } from "../../Util/Column";
import { RatingDisplay } from "../../Components/RatingDisplay";
import styled from "styled-components";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const P = styled.p`
  font-size: 1.4rem;
  margin-top: -4px;
  margin-left: 4px;
  margin-bottom: 1.2rem;
`;

interface AverageRatingProps {
  rating: number;
}

/**
 * Komponenta za prikaz povprečne ocene.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {number} props.rating - Povprečna ocena.
 * @returns {JSX.Element} JSX element, ki predstavlja povprečno oceno.
 *
 * @example
 * // Uporaba komponente
 * <AverageRating rating={4.5} />
 */

export const AverageRating: FC<AverageRatingProps> = ({ rating }) => {
  const { t } = useTranslation();
  return (
    <Column>
      <RatingDisplay rating={rating} />
      <P>{t("averageRating")}</P>
    </Column>
  );
};
