import { InfiniteProducts } from "../../Components/InfiniteProducts";
import { useParams, useSearchParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useInfinite } from "../../hooks/useInfinite";
import { getUserReviews } from "../../api/repliesReviews/getUserReviews";
import { Review } from "../../Util/types";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import { toDate } from "../../functions/toDate";
import { ReviewReplyCard } from "./ReviewReplyCard";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3.2rem;
`;

export const UserReviews = () => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();

  const { data: dataUser, isLoading } = useUser();

  const data = useInfinite({
    queryKey: ["userReviews", searchParams.get("sort"), userId],
    queryFn: ({ pageParam }) => {
      if (pageParam === null) return;

      return getUserReviews(
        String(userId),
        Number(pageParam),
        String(searchParams.get("sort"))
      );
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
    <InfiniteProducts
      {...data}
      container={Grid}
      renderFn={renderFn}
      isLoading={isLoading || data.isLoading}
    />
  );
};
