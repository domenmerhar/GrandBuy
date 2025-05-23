import { useGetUserOrders } from "../../hooks/order/useGetUserOrders";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { IOrder } from "../../Util/types";
import { Order } from "./Order";

/**
 * Komponenta za prikaz naročil uporabnika.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja naročila uporabnika.
 *
 * @example
 * // Uporaba komponente
 * <Orders />
 */

export const Orders = () => {
  const { data, isLoading, error } = useGetUserOrders();

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  return data?.data?.orders?.map((order: IOrder) => (
    <Order key={order._id} {...order} />
  ));
};
