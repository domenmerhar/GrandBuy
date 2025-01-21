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

export interface Reply {
  _id: string;
  user: string;
  review: string;
  reply: string;
  createdAt: string;
}

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image?: string;
  discount?: number;
}

export type role = "user" | "seller" | "admin";

export interface UserSettings {
  username: string;
  email: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  phoneNumber?: string;
  banned?: boolean;
  role: role;
}

export type ReviewSort =
  | "+likesCount"
  | "-likesCount"
  | "+createdAt"
  | "-createdAt";

export type RefundStatus = "pending" | "approved" | "rejected";

export type NotificationType = "message" | "warning";

export interface Notification {
  _id: string;
  type: NotificationType;
  message: string;
  viewed: boolean;
  createdAt: string;
}

export type APIstatus = "success" | "error";

export interface HistoryResponse {
  status: APIstatus;
  length: number;
  data: {
    historyItems: HistoryItem[];
  };
}

export interface HistoryItem {
  _id: string;
  user: string;
  product: string;
  name: string;
  coverImage: string;
  discount: number;
  totalPrice: number;
  createdAt: string;
}

export interface NotificationResponse {
  status: APIstatus;
  data: {
    notifications: Notification[];
  };
  nextItem: number;
}

export interface WishlistItemCountResponse {
  status: APIstatus;
  data: {
    wishlistItemCount: number;
  };
}

export interface WishlistResponse {
  status: APIstatus;
  results: number;
  totalItems: number;
  data: {
    wishlistItems: WishlistItem[];
  };
}

export interface WishlistItem {
  _id: string;
  user: string;
  productId: string;
  name: string;
  shipping: number;
  discount: number;
  totalPrice: number;
  coverImage: string;
  createdAt: string;
}
