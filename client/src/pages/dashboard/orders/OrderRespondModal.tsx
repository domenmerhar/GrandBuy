import { useSearchParams } from "react-router-dom";
import { Modal } from "../../../Components/Modal";
import { useTranslation } from "react-i18next";
import { useShipOrder } from "../../../hooks/order/useShipOrder";
import { useJWT } from "../../../hooks/useJWT";
import toast from "react-hot-toast";
import { useCancelOrder } from "../../../hooks/order/useCancelOrder";

/**
 * Komponenta za odziv na naročila v modalnem oknu.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja modalno okno za odziv na naročila.
 *
 * @example
 * // Uporaba komponente
 * <OrderRespondModal />
 */

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

  const { closeModal } = Modal.useModalContext();

  const handleOrderAction = (callback: () => unknown) => () => {
    if (!orderId?.trim() || !JWT)
      return toast.error(t("somethingWentWrong"), { id: "handle-order" });

    callback();
    closeModal();
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
