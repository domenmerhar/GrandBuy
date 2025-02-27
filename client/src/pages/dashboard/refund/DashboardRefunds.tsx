import { ErrorBox } from "../../../Components/ErrorBox";
import { SpinnerInBox } from "../../../Components/SpinnerInBox";
import useGetSellerRefunds from "../../../hooks/refund/useGetSellerRefunds";
import { Modal } from "../../../Util/Modal";
import RefundCard from "../../refund/RefundCard";
import { RefundModal } from "./RefundModal";
import { RefundItem } from "../../../Util/types/index";
import styled from "styled-components";

const RefundGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(35rem, 1fr));
  gap: 1.6rem;
  justify-content: space-between;
`;

export const DashboardRefunds = () => {
  const { setIsOpen } = Modal.useModalContext();

  const { data, error, isLoading } = useGetSellerRefunds();

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox />;

  return (
    <RefundGrid>
      {data?.data?.refunds?.map(
        ({ _id, createdAt, reason, cartItemId, status, user }: RefundItem) => (
          <RefundCard
            key={_id}
            date={createdAt}
            productName={cartItemId?.name}
            productQuantity={cartItemId?.quantity}
            reason={reason}
            status={status}
            userImage={user?.image}
            username={user?.username}
            userId={user?._id}
          />
        )
      )}
      <RefundModal />
    </RefundGrid>
  );
};
