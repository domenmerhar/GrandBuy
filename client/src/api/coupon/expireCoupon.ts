import { toApiPath } from "../../functions/toApiPath";

export default async function expireCoupon({
  JWT,
  couponId,
}: {
  JWT: string;
  couponId: string;
}) {
  const Authorization = `Bearer ${JWT}`;

  const response = await fetch(toApiPath(`coupon/seller/${couponId}`), {
    method: "DELETE",
    headers: {
      Authorization,
    },
  });

  const data = await response.json();
  return data;
}
