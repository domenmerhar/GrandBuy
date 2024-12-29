import { useSearchParams } from "react-router-dom";
import { Modal } from "../../../Util/Modal";

export const OrderRespondModal = () => {
  const [, setSearchParams] = useSearchParams();

  const handleModalExit = () =>
    setSearchParams((searchParams) => {
      searchParams.delete("orderId");
      return searchParams;
    });

  return (
    <Modal.Window
      title="Respond"
      type="cancelReject"
      onBackdropClick={handleModalExit}
      onCancelReject={handleModalExit}
      onSubmitApprove={handleModalExit}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
      eligendi aut. Perspiciatis rerum dolorem repellendus aut, illo magnam ipsa
      quia voluptatum iste neque necessitatibus, labore fugit provident ut
      quibusdam laborum?
    </Modal.Window>
  );
};
