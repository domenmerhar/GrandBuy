import styled from "styled-components";
import { Column } from "../../Util/Column";
import { Review } from "./Review";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { useReviews } from "./useReviews";
import { toApiFilesPath } from "../../functions/toApiFilesPath";

const StyledReviews = styled(Column)`
  overflow-y: auto;
  flex: 1;
`;

/**
 * Komponenta za prikaz mnenj.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja mnenja.
 *
 * @example
 * // Uporaba komponente
 * <Reviews />
 */

export const Reviews = () => {
  const { data, isLoading, error } = useReviews();

  if (isLoading) return <SpinnerInBox size="large" />;
  if (error) return <ErrorBox fullPage={false} />;

  return (
    <StyledReviews $gap="3.2rem">
      {data?.data?.reviews?.map(
        ({
          _id,
          user,
          review,
          rating,
          likesCount,
          createdAt,
        }: {
          _id: string;
          user: { _id: string; username: string; image?: string };
          review: string;
          rating: number;
          likesCount: number;
          createdAt: string;
        }) => (
          <Review
            date={createdAt}
            key={_id}
            id={_id}
            content={review}
            likeCount={likesCount}
            rating={rating}
            username={user?.username}
            userImage={toApiFilesPath(user?.image)}
          />
        )
      )}
    </StyledReviews>
  );
};
