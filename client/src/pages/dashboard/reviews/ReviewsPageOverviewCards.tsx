import { Row } from "../../../Util/Row";
import { OverviewCard } from "../../../Components/OverviewCard";
import { BiStar } from "react-icons/bi";
import { HiOutlineMicrophone } from "react-icons/hi";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ReviewsPageOverviewCardsProps {
  reviewsCount: number | "N/A";
  averageRating: number | "N/A";
}

/**
 * Komponenta za prikaz preglednih kartic strani z ocenami.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {number | "N/A"} props.reviewsCount - Število ocen.
 * @param {number | "N/A"} props.averageRating - Povprečna ocena.
 * @returns {JSX.Element} JSX element, ki predstavlja pregledne kartice strani z ocenami.
 *
 * @example
 * // Uporaba komponente
 * <ReviewsPageOverviewCards reviewsCount={10} averageRating={4.5} />
 */

export const ReviewsPageOverviewCards: FC<ReviewsPageOverviewCardsProps> = ({
  reviewsCount,
  averageRating,
}) => {
  const { t } = useTranslation();

  return (
    <Row $gap="1.6rem" $flexWrap="wrap">
      <OverviewCard
        icon={<HiOutlineMicrophone />}
        title={t("reviews")}
        content={String(reviewsCount)}
      />

      <OverviewCard
        icon={<BiStar />}
        title={t("averageRating")}
        content={String(averageRating)}
      />
    </Row>
  );
};
