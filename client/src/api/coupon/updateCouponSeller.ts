import { toApiPath } from "../../functions/toApiPath";

export default async function updateCouponSeller({
  JWT,
  couponId,
  products,
  discount,
  expireAt,
}: {
  JWT: string;
  couponId: string;
  products: string[];
  discount: number;
  expireAt: Date;
}) {
  const Authorization = `Bearer ${JWT}`;
  const body = JSON.stringify({ products, discount, expireAt });

  const response = await fetch(toApiPath(`coupon/seller/${couponId}`), {
    method: "PATCH",
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
}
