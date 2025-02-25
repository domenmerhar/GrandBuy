import { useSearchParams } from "react-router-dom";
import { Modal } from "../../../Util/Modal";
import { useTranslation } from "react-i18next";
import { useShipOrder } from "../../../hooks/order/useShipOrder";
import { useJWT } from "../../../hooks/useJWT";
import toast from "react-hot-toast";
import { useCancelOrder } from "../../../hooks/order/useCancelOrder";

export const OrderRespondModal = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { JWT } = useJWT();
  const { mutate: shipOrder } = useShipOrder();
  const { mutate: cancelOrder } = useCancelOrder();

  const handleModalExit = () =>
    setSearchParams((searchParams) => {
      searchParams.delete("orderId");
      return searchParams;
    });

  const handleOrderAction = (callback: () => unknown) => () => {
    if (!orderId || !JWT)
      return toast.error(t("somethingWentWrong"), { id: "handle-order" });

    callback();
  };

  const handleShip = handleOrderAction(() =>
    shipOrder({ orderId: orderId!, JWT })
  );

  const handleCancel = handleOrderAction(() =>
    cancelOrder({ orderId: orderId!, JWT })
  );

  return (
    <Modal.Window
      title={t("respond")}
      buttons={[
        {
          key: "cancel",
          text: t("cancel"),
          color: "red",
          onClick: handleCancel,
        },

        {
          key: "ship",
          text: t("ship"),
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
