import styled from "styled-components";
import { Column } from "../../Util/Column";
import { RatingDisplay } from "../../Components/RatingDisplay";
import { UsernameIcon } from "./UsernameIcon";
import { ReviewActions } from "./ReviewActions";
import { FC, useState } from "react";
import { Replies } from "./Replies";
import { toDate } from "../../functions/toDate";

const ReviewContent = styled.p`
  max-width: 75ch;
`;

const Date = styled.span`
  font-size: 1.4rem;
  color: var(--gray-6);
`;

interface ReviewProps {
  id: string;
  date: string;
  userImage: string;
  username: string;
  rating: number;
  content: string;
  likeCount: number;
}

export const Review: FC<ReviewProps> = ({
  date,
  userImage,
  username,
  rating,
  content,
  likeCount,
  id,
}) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);

  return (
    <>
      <Column $gap="4px">
        <UsernameIcon username={username} icon={userImage} />
        {date ? <Date>{toDate(date)}</Date> : null}

        <RatingDisplay rating={rating} size={16} showTooltip={false} />

        <ReviewContent>{content}</ReviewContent>

        <ReviewActions
          reviewId={id}
          showReplies={showReplies}
          setShowReplies={setShowReplies}
          likeCount={likeCount}
        />
      </Column>

      {showReplies && <Replies id={id} />}
    </>
  );
};
