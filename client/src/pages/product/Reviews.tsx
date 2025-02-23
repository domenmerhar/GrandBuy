import styled from "styled-components";
import { Column } from "../../Util/Column";
import { Review } from "./Review";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { useReviews } from "./useReviews";

const StyledReviews = styled(Column)`
  overflow-y: auto;
  flex: 1;
`;

export const Reviews = () => {
  const { data, isLoading, error } = useReviews();

  if (isLoading) return <SpinnerInBox size="large" />;
  if (error) return <ErrorBox fullPage={false} />;

  return (
    <StyledReviews $gap="3.2rem">
      {data.data.reviews.map(
        ({
          _id,
          user,
          review,
          rating,
          likesCount,
        }: {
          _id: string;
          user: { _id: string; username: string; image?: string };
          review: string;
          rating: number;
          likesCount: number;
        }) => (
          <Review
            key={_id}
            id={_id}
            content={review}
            likeCount={likesCount}
            rating={rating}
            username={user?.username}
            userImage={user?.image || "https://placehold.jp/150x150.png"}
          />
        )
      )}
    </StyledReviews>
  );
};
