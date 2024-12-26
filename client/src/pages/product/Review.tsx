import styled from "styled-components";
import { Column } from "../../Util/Column";
import { RatingDisplay } from "../../Components/RatingDisplay";
import { Reply } from "./Reply";
import { UsernameIcon } from "./UsernameIcon";
import { ReviewActions } from "./ReviewActions";
import { useState } from "react";

const ReviewContent = styled.p``;

export const Review = () => {
  const [showReplies, setShowReplies] = useState<boolean>(false);

  return (
    <>
      <Column $gap="4px">
        <UsernameIcon />

        <RatingDisplay rating={4} size={16} showTooltip={false} />

        <ReviewContent>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
          blanditiis natus deserunt fugit numquam doloremque atque placeat
          praesentium eligendi aliquid, veniam velit ratione necessitatibus
          maiores, impedit ex molestias facere voluptatibus.
        </ReviewContent>

        <ReviewActions
          showReplies={showReplies}
          setShowReplies={setShowReplies}
        />
      </Column>

      {showReplies && <Reply />}
    </>
  );
};
