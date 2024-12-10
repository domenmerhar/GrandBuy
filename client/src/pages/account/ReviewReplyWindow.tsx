import { CardWithHeader } from "../../Util/CardWithHeader";
import { ReviewReplyWindowHeader } from "./ReviewReplyWindowHeader";
import { ReviewReplyWindowBody } from "./ReviewReplyWindowBody";

export const ReviewReplyWindow = () => {
  return (
    <>
      <CardWithHeader>
        <ReviewReplyWindowHeader />

        <ReviewReplyWindowBody />
      </CardWithHeader>
    </>
  );
};
