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
  _id: string;
  name: string;
  coverImage: string;
  discount: number;
  totalPrice: number;
}

export interface Review {
  _id: string;
  user: string;
  product: string;
  rating: number;
  review: string;
  likes: string[];
  lastChange: string;
  createdAt: string;
  likesCount: number;
}

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image?: string;
  discount?: number;
}

export type ReviewSort =
  | "+likesCount"
  | "-likesCount"
  | "+createdAt"
  | "-createdAt";
