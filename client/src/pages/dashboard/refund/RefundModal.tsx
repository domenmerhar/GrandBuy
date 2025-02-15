import { useTranslation } from "react-i18next";
import { TextareaWithLabel } from "../../../Components/TextareaWithLabel";
import { Column } from "../../../Util/Column";
import { Modal } from "../../../Util/Modal";

export const RefundModal = () => {
  const { t } = useTranslation();

  return (
    <Modal.Window title={t("respondToRequest")}>
      <Column $gap="8px">
        <TextareaWithLabel
          label={t("response")}
          placeholder={t("writeYourResponseHere")}
          id="response"
        />
      </Column>
    </Modal.Window>
  );
};
