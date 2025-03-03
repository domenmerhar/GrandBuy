import { FC } from "react";
import styled from "styled-components";
import { Row } from "../../Util/Row";
import { HiArrowUturnLeft, HiOutlineHandThumbUp } from "react-icons/hi2";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { Modal } from "../../Components/Modal";
import { useSearchParams } from "react-router-dom";
import { ReviewAction } from "../../Util/ReviewAction";
import { useMe } from "../../hooks/useMe";
import { useTranslation } from "react-i18next";
import useLikeReview from "../../hooks/repliesReviews/useLikeReview";
import { useJWT } from "../../hooks/useJWT";

const ReviewActionsRow = styled(Row)`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--gray-7);
  margin-top: 4px;
`;

interface ReviewActionsProps {
  reviewId: string;
  showReplies: boolean;
  setShowReplies: React.Dispatch<React.SetStateAction<boolean>>;
  likeCount: number;
}

/**
 * Komponenta za prikaz dejanj za mnenje.
 *
 * @component
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.reviewId - ID mnenja.
 * @param {boolean} props.showReplies - Ali naj bodo odgovori prikazani.
 * @param {function} props.setShowReplies - Funkcija za nastavljanje vidnosti odgovorov.
 * @param {number} props.likeCount - Število všečkov mnenja.
 * @returns {JSX.Element} JSX element, ki predstavlja dejanja za mnenje.
 *
 * @example
 * // Uporaba komponente
 * <ReviewActions
 *   reviewId="1"
 *   showReplies={true}
 *   setShowReplies={() => {}}
 *   likeCount={10}
 * />
 */

export const ReviewActions: FC<ReviewActionsProps> = ({
  reviewId,
  showReplies,
  setShowReplies,
  likeCount,
}) => {
  const { t } = useTranslation();
  const { data } = useMe();
  const role = data?.data?.role;

  const { setIsOpen } = Modal.useModalContext();
  const [, setSearchParams] = useSearchParams();
  const { JWT } = useJWT();

  const { mutate: likeReview } = useLikeReview();

  const handleLikeReview = () => {
    likeReview({ reviewId, JWT });
  };

  const handleShowReplies = () => {
    setShowReplies((prev: boolean) => !prev);
  };

  const handleReply = () => {
    setSearchParams({ reply: reviewId });
    setIsOpen(true);
  };

  return (
    <ReviewActionsRow $alignItems="center" $gap="1.6rem">
      {["user", "seller"].includes(role) ? (
        <>
          <ReviewAction
            $gap="4px"
            $alignItems="center"
            as="button"
            onClick={handleLikeReview}
          >
            <HiOutlineHandThumbUp size={24} />
            <span>{likeCount}</span>
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
        </>
      ) : null}

      <ReviewAction
        $gap="4px"
        $alignItems="center"
        as="button"
        onClick={handleShowReplies}
      >
        {showReplies ? <HiChevronUp size={22} /> : <HiChevronDown size={22} />}
        <span>{t("showReplies")}</span>
      </ReviewAction>
    </ReviewActionsRow>
  );
};
