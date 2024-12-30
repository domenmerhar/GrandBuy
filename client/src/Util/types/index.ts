export interface iTime {
  hoursUntilMidnight: number;
  minutesUntilMidnight: number;
  secondsUntilMidnight: number;
}

export interface IOption {
  name: string;
  value: string;
}

export interface RowColumnProps {
  $gap?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $flexWrap?: string;
}

export type languages = "en" | "sl";

export interface BadgeProps {
  $color: "orange" | "red" | "green" | "yellow";
  $size?: "medium" | "small";
}

export type OrderStatus = "shipped" | "cancelled" | "pending";
export interface IOrderTable {
  username: string;
  orderID: string;
  quantity: number;
  product: string;
  status: OrderStatus;
}

export interface IProductShort {
  id: string;
  name: string;
  coverImage: string;
  discount: number;
  totalPrice: number;
}
