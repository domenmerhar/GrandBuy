import { ErrorBox } from "../../../Components/ErrorBox";
import { SpinnerInBox } from "../../../Components/SpinnerInBox";
import useGetSellerRefunds from "../../../hooks/refund/useGetSellerRefunds";
import { Modal } from "../../../Components/Modal";
import RefundCard from "../../refund/RefundCard";
import { RefundItem } from "../../../Util/types/index";
import styled from "styled-components";
import { RefundModalDashboard } from "./RefundModalDashboard";

const RefundGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(35rem, 1fr));
  gap: 1.6rem;
  justify-content: space-between;
`;

/**
 * Komponenta za prikaz povračil na nadzorni plošči.
 *
 * @component
 * @returns {JSX.Element} JSX element, ki predstavlja povračila na nadzorni plošči.
 *
 * @example
 * // Uporaba komponente
 * <DashboardRefunds />
 */

export const DashboardRefunds = () => {
  const { data, error, isLoading } = useGetSellerRefunds();

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox />;

  return (
    <RefundGrid>
      {data?.data?.refunds?.map(
        ({ _id, createdAt, reason, cartItemId, status, user }: RefundItem) => (
          <RefundCard
            key={_id}
            reviewId={_id}
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
      <RefundModalDashboard />
    </RefundGrid>
  );
};
