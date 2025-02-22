import styled from "styled-components";
import { useGetSellerReviews } from "../../../hooks/repliesReviews/useGetSellerReviews";
import { Modal } from "../../../Util/Modal";
import { ReviewProduct } from "../../../Util/types";
import { ReviewCardDashboard } from "./ReviewCardDashboard";
import { SpinnerInBox } from "../../../Components/SpinnerInBox";
import { ErrorBox } from "../../../Components/ErrorBox";
import { ReplyModal } from "../../product/ReplyModal";

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, max-content));
  gap: 1.6rem;
`;

export const DashboardReviews = () => {
  const { data, isLoading, error } = useGetSellerReviews();

  if (isLoading) {
    return <SpinnerInBox fullPage={false} />;
  }

  if (error) {
    return <ErrorBox fullPage={false} />;
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
              productId={productDetails?._id}
              reviewId={_id}
              date={lastChange}
              likes={likes.length}
              productImage={productDetails?.coverImage}
              productName={productDetails?.name}
              rating={rating}
              review={review}
              userId={userDetails?._id}
              userImage={userDetails?.image}
              username={userDetails?.username}
            />
          )
        )}
      </DashboardGrid>

      <ReplyModal />
    </Modal>
  );
};
