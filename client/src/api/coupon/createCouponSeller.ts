import { toApiPath } from "../../functions/toApiPath";

export default async function createCouponSeller({
  JWT,
  code,
  products,
  discount,
  expireAt,
}: {
  JWT: string;
  code: string;
  products: string[];
  discount: number;
  expireAt: Date;
}) {
  const Authorization = `Bearer ${JWT}`;
  const body = JSON.stringify({ code, products, discount, expireAt });

  const response = await fetch(toApiPath(`coupon/seller`), {
    method: "POST",
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
}
