import { CardWithHeader } from "../../Components/Card/CardWithHeader";
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
