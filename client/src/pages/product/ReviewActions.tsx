import { FC } from "react";
import styled from "styled-components";
import { Row } from "../../Util/Row";
import { HiArrowUturnLeft, HiOutlineHandThumbUp } from "react-icons/hi2";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { Modal } from "../../Util/Modal";
import { useSearchParams } from "react-router-dom";
import { ReviewAction } from "../../Util/ReviewAction";
import { useMe } from "../../hooks/useMe";
import { useTranslation } from "react-i18next";

const ReviewActionsRow = styled(Row)`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--gray-7);
  margin-top: 4px;
`;

interface ReviewActionsProps {
  showReplies: boolean;
  setShowReplies: React.Dispatch<React.SetStateAction<boolean>>;
  likeCount: number;
}

export const ReviewActions: FC<ReviewActionsProps> = ({
  showReplies,
  setShowReplies,
  likeCount,
}) => {
  const { t } = useTranslation();
  const { data } = useMe();
  const role = data?.data?.role;
  const id: string = "id1278203";

  const { setIsOpen } = Modal.useModalContext();
  const [, setSearchParams] = useSearchParams();

  const handleShowReplies = () => {
    setShowReplies((prev: boolean) => !prev);
  };

  const handleReply = () => {
    setSearchParams({ reply: id });
    setIsOpen(true);
  };

  return (
    <ReviewActionsRow $alignItems="center" $gap="1.6rem">
      {["user", "seller"].includes(role) ? (
        <>
          <ReviewAction $gap="4px" $alignItems="center" as="button">
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
