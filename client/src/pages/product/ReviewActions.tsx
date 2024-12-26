import { FC } from "react";
import styled from "styled-components";
import { Row } from "../../Util/Row";
import { HiArrowUturnLeft, HiOutlineHandThumbUp } from "react-icons/hi2";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const ReviewActionsRow = styled(Row)`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--gray-7);
  margin-top: 4px;
`;

interface ReviewActionProps {
  $active?: boolean;
}

const ReviewAction = styled(Row)<ReviewActionProps>`
  background: transparent;
  border: none;
  text-transform: uppercase;

  transition: all 200ms;

  ${({ $active }) => $active && `color: var(--orange-6);`}

  &:hover {
    color: var(--gray-9);
  }
`;

interface ReviewActionsProps {
  showReplies: boolean;
  setShowReplies: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReviewActions: FC<ReviewActionsProps> = ({
  showReplies,
  setShowReplies,
}) => {
  const handleShowReplies = () => {
    setShowReplies((prev: boolean) => !prev);
  };

  return (
    <ReviewActionsRow $alignItems="center" $gap="1.6rem">
      <ReviewAction $gap="4px" $alignItems="center" as="button">
        <HiOutlineHandThumbUp size={24} />
        <span>444</span>
      </ReviewAction>

      <ReviewAction $gap="4px" $alignItems="center" as="button">
        <HiArrowUturnLeft size={22} />
        <span>Reply</span>
      </ReviewAction>

      <ReviewAction
        $gap="4px"
        $alignItems="center"
        as="button"
        onClick={handleShowReplies}
      >
        {showReplies ? <HiChevronUp size={22} /> : <HiChevronDown size={22} />}
        <span>Show Replies</span>
      </ReviewAction>
    </ReviewActionsRow>
  );
};
