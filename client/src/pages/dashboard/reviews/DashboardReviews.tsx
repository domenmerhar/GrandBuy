import styled from "styled-components";
import { useGetSellerReviews } from "../../../hooks/repliesReviews/useGetSellerReviews";
import { Modal } from "../../../Util/Modal";
import { ReviewProduct } from "../../../Util/types";
import { ReviewCardDashboard } from "./ReviewCardDashboard";

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, max-content));
  gap: 1.6rem;
`;

export const DashboardReviews = () => {
  const { data, isLoading, error } = useGetSellerReviews();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Modal>
      <DashboardGrid>
        {data?.data?.reviews.map(
          ({
            _id,
            userDetails,
            rating,
            lastChange,
            review,
            likes,
            productDetails,
          }: ReviewProduct) => (
            <ReviewCardDashboard
              key={_id}
              date={lastChange}
              likes={likes.length}
              productImage={productDetails?.coverImage}
              productName={productDetails?.name}
              rating={rating}
              review={review}
              userImage={userDetails?.image}
              username={userDetails?.username}
            />
          )
        )}
      </DashboardGrid>
    </Modal>
  );
};
