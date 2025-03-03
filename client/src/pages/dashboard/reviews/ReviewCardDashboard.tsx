import { BlankCard } from "../../../Util/BlankCard";
import { Row } from "../../../Util/Row";
import styled from "styled-components";
import { Column } from "../../../Util/Column";
import { UserIcon } from "../../../Util/ProfileIcon";
import { RatingDisplay } from "../../../Components/RatingDisplay";
import { HiArrowUturnLeft, HiOutlineHandThumbUp } from "react-icons/hi2";
import { ReviewAction } from "../../../Util/ReviewAction";
import { Modal } from "../../../Components/Modal";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { toApiFilesPath } from "../../../functions/toApiFilesPath";
import { toDate } from "../../../functions/toDate";
import { Link } from "react-router-dom";
import useLikeReview from "../../../hooks/repliesReviews/useLikeReview";
import { useJWT } from "../../../hooks/useJWT";

const Img = styled.img`
  color: transparent;
  width: 12.8rem;
`;

const Date = styled.p`
  color: var(--gray-6);
  margin-top: -4px;
`;

const P = styled.p`
  max-width: 30ch;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    cursor: pointer;
  }
`;

interface ReviewCardDashboardProps {
  reviewId: string;
  productId: string;
  productImage: string;
  productName: string;
  userId: string;
  userImage: string;
  username: string;
  rating: number;
  date: string;
  review: string;
  likes: number;
}

/**
 * Komponenta za prikaz mnenj na nadzorni plošči.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.reviewId - ID mnenja.
 * @param {string} props.productId - ID izdelka.
 * @param {string} props.productImage - URL slike izdelka.
 * @param {string} props.productName - Ime izdelka.
 * @param {string} props.userId - ID uporabnika.
 * @param {string} props.userImage - URL slike uporabnika.
 * @param {string} props.username - Uporabniško ime.
 * @param {number} props.rating - Ocena.
 * @param {string} props.date - Datum.
 * @param {string} props.review - Mnenje.
 * @param {number} props.likes - Število všečkov.
 * @returns {JSX.Element} JSX element, ki predstavlja mnenje na nadzorni plošči.
 *
 * @example
 * // Uporaba komponente
 * <ReviewCardDashboard
 *   reviewId="123"
 *   productId="456"
 *   productImage="https://example.com/image.jpg"
 *   productName="Izdelek"
 *   userId="789"
 *   userImage="https://example.com/user.jpg"
 *   username="Janez Novak"
 *   rating={5}
 *   date="2025-03-03"
 *   review="Odličen izdelek!"
 *   likes={10}
 * />
 */

export const ReviewCardDashboard: FC<ReviewCardDashboardProps> = ({
  reviewId,
  productId,
  productImage,
  productName,
  userId,
  userImage,
  username,
  rating,
  date,
  review,
  likes,
}) => {
  const { t } = useTranslation();

  const { setIsOpen } = Modal.useModalContext();
  const [, setSearchParams] = useSearchParams();

  const { JWT } = useJWT();
  const { mutate: likeReview } = useLikeReview();

  const handleReply = () => {
    setSearchParams((searchParams) => {
      searchParams.set("reply", reviewId);
      return searchParams;
    });
    setIsOpen(true);
  };

  const handleLike = () => {
    likeReview({ JWT, reviewId });
  };

  return (
    <BlankCard>
      <Row $gap="8px" $alignItems="center">
        <StyledLink
          to={`/product/${productId}`}
          style={{ textDecoration: "none" }}
        >
          <Img src={toApiFilesPath(productImage)} alt={productName} />
        </StyledLink>

        <Column $gap="1.6rem">
          <StyledLink
            to={`/account/user/${userId}`}
            style={{ textDecoration: "none" }}
          >
            <Row $gap="4px" $alignItems="center">
              <UserIcon src={toApiFilesPath(userImage)} alt={username} />
              {username}
            </Row>
          </StyledLink>

          <div>
            <RatingDisplay rating={rating} showTooltip={false} size={24} />
            <Date>
              {t("posted")}: {toDate(date)}
            </Date>
          </div>
          <P>{review}</P>

          <Row $gap="1.6rem">
            <ReviewAction $gap="4px" $alignItems="center" onClick={handleLike}>
              <HiOutlineHandThumbUp size={24} />
              <span>{likes}</span>
            </ReviewAction>

            <ReviewAction
              $gap="4px"
              $alignItems="center"
              as="button"
              onClick={handleReply}
            >
              <HiArrowUturnLeft size={22} />
              <span>{t("reply")}</span>
            </ReviewAction>
          </Row>
        </Column>
      </Row>
    </BlankCard>
  );
};
