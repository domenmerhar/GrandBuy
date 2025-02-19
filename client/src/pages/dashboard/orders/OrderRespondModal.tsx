import { useSearchParams } from "react-router-dom";
import { Modal } from "../../../Util/Modal";
import { useTranslation } from "react-i18next";
import { useShipOrder } from "../../../hooks/order/useShipOrder";
import { useJWT } from "../../../hooks/useJWT";
import toast from "react-hot-toast";

export const OrderRespondModal = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { JWT } = useJWT();
  const { mutate: shipOrder } = useShipOrder();

  const handleModalExit = () =>
    setSearchParams((searchParams) => {
      searchParams.delete("orderId");
      return searchParams;
    });

  const handleShip = () => {
    if (!orderId || !JWT)
      return toast.error(t("somethingWentWrong"), { id: "handle-order" });

    shipOrder({ orderId, JWT });
  };

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
          onClick: handleShip,
        },
      ]}
      onClose={handleModalExit}
    >
      {t("orderDecisionPrompt")}
    </Modal.Window>
  );
};
