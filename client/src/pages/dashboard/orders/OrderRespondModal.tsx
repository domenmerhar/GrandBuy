import { useSearchParams } from "react-router-dom";
import { Modal } from "../../../Util/Modal";
import { useTranslation } from "react-i18next";

export const OrderRespondModal = () => {
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();

  const handleModalExit = () =>
    setSearchParams((searchParams) => {
      searchParams.delete("orderId");
      return searchParams;
    });

  return (
    <Modal.Window
      title={t("respond")}
      buttons={[
        {
          key: "cancel",
          text: t("cancel"),
          color: "red",
          onClick: handleModalExit,
        },
        {
          key: "approve",
          text: t("approve"),
          color: "green",
          onClick: handleModalExit,
        },
      ]}
      onClose={handleModalExit}
    >
      {t("orderDecisionPrompt")}
    </Modal.Window>
  );
};
