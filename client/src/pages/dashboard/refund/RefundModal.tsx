import { TextareaWithLabel } from "../../../Components/TextareaWithLabel";
import { Column } from "../../../Util/Column";
import { Modal } from "../../../Util/Modal";

export const RefundModal = () => {
  return (
    <Modal.Window title="Respond to request">
      <Column $gap="8px">
        <TextareaWithLabel
          label="Response"
          placeholder="Write your response here"
          id="response"
        />
      </Column>
    </Modal.Window>
  );
};
