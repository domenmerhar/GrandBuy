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
  $color: BadgeColor;
  $size?: "medium" | "small";
}

export type BadgeColor = "orange" | "red" | "green" | "yellow";

export type OrderStatus = "pending" | "cancelled" | "shipped" | "delivered";

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
    wishlistItems: WishlistItemInterface[];
  };
}

export interface WishlistItemInterface {
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

export interface CartItemInterface {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  product: string;
  name: string;
  price: number;
  shipping: number;
  totalPrice: number;
  image: string;
  quantity: number;
  discount: number;
  status: string;
  createdAt: string;
}

export type ItemStatus = OrderStatus | "refunded";

export interface IOrder {
  _id: string;
  user: string;
  products: OrderProduct[];
  totalPrice: number;
  status: OrderStatus;
  paid: boolean;
  createdAt: string;
  estimatedDelivery: string;
  deliveredAt?: string;
}

export interface OrderProduct {
  _id: string;
  product: string;
  name: string;
  image: string;
  totalPrice: number;
  quantity: number;
  id: string;
  status: ItemStatus;
}

export interface RefundUser {
  _id: string;
  cartItemId: {
    _id: string;
    user: {
      _id: string;
      email: string;
    };
    name: string;
    quantity: number;
  };
  reason: string;
  status: RefundStatus;
  user: string;
  seller: {
    _id: string;
    email: string;
  };
  createdAt: string;
  resolvedAt: string;
  resolvedMessage: string;
}

export interface IRefundPage {
  status: APIstatus;
  data: { refunds: RefundUser[] };
  length: number;
  nextItem: string | null;
}

export type SortCreatedAt = "+createdAt" | "-createdAt";
export type SortDiscount = "+discount" | "-discount";

export interface ICoupon {
  _id: string;
  products: string[];
  code: string;
  discount: number;
  expireAt: string;
  createdBy: string;
}

export interface ISellerOrder {
  _id: string;
  product: {
    _id: string;
    name: string;
  };
  price: number;
  shipping: number;
  totalPrice: number;
  quantity: number;
  discount: number;
  status: "pending" | "shipped" | "delivered" | "cancelled"; // Add other possible statuses if needed
}
