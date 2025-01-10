import styled from "styled-components";
import { CardWithHeader } from "../../Util/CardWithHeader";
import { Column } from "../../Util/Column";
import { ReviewReplyWindowSelect } from "./ReviewReplyWindowSelect";
import { useParams } from "react-router-dom";
import { useInfinite } from "../../hooks/useInfinite";
import { getUserReviews } from "../../api/getUserReviews";
import { InfiniteProducts } from "../../Components/InfiniteProducts";
import { Review } from "../../Util/types";
import { ReviewReplyCard } from "./ReviewReplyCard";
import { toDate } from "../../functions/toDate";
import { useUser } from "../../hooks/useUser";
import { toApiFilesPath } from "../../functions/toApiFilesPath";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3.2rem;
`;

export const ReviewReplyWindowBody = () => {
  const { userId } = useParams();

  const { data: dataUser, isLoading } = useUser();

  const data = useInfinite({
    queryKey: ["userReviews", userId],
    queryFn: ({ pageParam }) => {
      if (pageParam === null) return;

      return getUserReviews(String(userId), Number(pageParam));
    },
  });

  const renderFn = (page: { data?: { doc: Review[] } }) => {
    if (!page?.data) return;

    return page.data.doc.map(({ _id, review, createdAt }) => (
      <ReviewReplyCard
        key={_id}
        content={review}
        date={toDate(createdAt)}
        profileImage={
          dataUser?.data?.image ? toApiFilesPath(dataUser?.data?.image) : ""
        }
        username={dataUser?.data?.username}
      />
    ));
  };

  return (
    <CardWithHeader.Body>
      <Column $gap="3.2rem">
        <ReviewReplyWindowSelect />

        <InfiniteProducts
          {...data}
          container={Grid}
          renderFn={renderFn}
          isLoading={isLoading || data.isLoading}
        />
      </Column>
    </CardWithHeader.Body>
  );
};
