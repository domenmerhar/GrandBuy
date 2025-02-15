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

export const AverageRating: FC<AverageRatingProps> = ({ rating }) => {
  const { t } = useTranslation();
  return (
    <Column>
      <RatingDisplay rating={rating} />
      <P>{t("averageRating")}</P>
    </Column>
  );
};
