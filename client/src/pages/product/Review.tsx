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

/**
 * Komponenta za prikaz mnenja.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.id - ID mnenja.
 * @param {string} props.date - Datum objave mnenja.
 * @param {string} props.userImage - URL slike uporabnika.
 * @param {string} props.username - Uporabniško ime avtorja mnenja.
 * @param {number} props.rating - Ocena mnenja.
 * @param {string} props.content - Vsebina mnenja.
 * @param {number} props.likeCount - Število všečkov mnenja.
 * @returns {JSX.Element} JSX element, ki predstavlja mnenje.
 *
 * @example
 * // Uporaba komponente
 * <Review
 *   id="1"
 *   date="2025-03-03"
 *   userImage="https://example.com/image.jpg"
 *   username="JaneDoe"
 *   rating={5}
 *   content="Odličen izdelek!"
 *   likeCount={10}
 * />
 */

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
