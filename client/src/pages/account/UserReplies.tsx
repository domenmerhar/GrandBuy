import { useParams, useSearchParams } from "react-router-dom";
import { useInfinite } from "../../hooks/useInfinite";
import { getUserReplies } from "../../api/repliesReviews/getUserReplies";
import { Reply } from "../../Util/types";
import { ReviewReplyCard } from "./ReviewReplyCard";
import { toDate } from "../../functions/toDate";
import { InfiniteProducts } from "../../Components/InfiniteProducts";
import styled from "styled-components";
import { useUser } from "../../hooks/useUser";
import { toApiFilesPath } from "../../functions/toApiFilesPath";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3.2rem;
`;

/**
 * UserReplies komponenta za prikaz odgovorov uporabnika.
 *
 * Ta komponenta uporablja neskončno pridobivanje podatkov (useInfinite) za prikaz odgovorov uporabnika v mreži (Grid).
 *
 * @returns {JSX.Element} - JSX element, ki prikazuje odgovore uporabnika.
 *
 * @example
 * // Uporaba komponente
 * <UserReplies />
 */

export const UserReplies = () => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const sort =
    searchParams.get("sort") === "-createdAt" ? "-createdAt" : "+createdAt";

  const { data: dataUser, isLoading } = useUser();

  const data = useInfinite({
    queryKey: ["userReplies", searchParams.get("sort"), userId],
    queryFn: ({ pageParam }) => {
      if (pageParam === null) return;

      return getUserReplies({
        userId: String(userId),
        page: Number(pageParam),
        sort,
      });
    },
  });

  const renderFn = ({ data }: { data: { replies: Reply[] } }) => {
    if (!data?.replies) return null;

    return data?.replies?.map(({ _id, reply, createdAt }) => (
      <ReviewReplyCard
        key={_id}
        content={reply}
        date={toDate(createdAt)}
        profileImage={toApiFilesPath(dataUser?.data?.image)}
        username={dataUser?.data?.username}
      />
    ));
  };

  return (
    <InfiniteProducts
      {...data}
      renderFn={renderFn}
      container={Grid}
      isLoading={isLoading || data?.isLoading}
    />
  );
};
