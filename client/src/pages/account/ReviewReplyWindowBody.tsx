import { useSearchParams } from "react-router-dom";
import { CardWithHeader } from "../../Util/CardWithHeader";
import { Column } from "../../Util/Column";
import { ReviewReplyWindowSelect } from "./ReviewReplyWindowSelect";
import { UserReviews } from "./UserReviews";

export const ReviewReplyWindowBody = () => {
  const [searchParams] = useSearchParams();

  return (
    <CardWithHeader.Body>
      <Column $gap="3.2rem">
        <ReviewReplyWindowSelect />

        {searchParams.get("location") === "replies" ? null : <UserReviews />}
      </Column>
    </CardWithHeader.Body>
  );
};
