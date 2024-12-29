import { Modal } from "../../../Util/Modal";
import { Row } from "../../../Util/Row";
import { RefundCard } from "../../refund/RefundCard";
import { RefundModal } from "./RefundModal";
export const DashboardRefunds = () => {
  const { setIsOpen } = Modal.useModalContext();

  return (
    <Row
      $gap="3.2rem"
      $justifyContent="center"
      $alignItems="flex-start"
      $flexWrap="wrap"
    >
      <RefundCard />
      <RefundCard />
      <RefundCard />
      <RefundCard />

      <RefundModal />
    </Row>
  );
};
