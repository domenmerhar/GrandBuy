import { toApiPath } from "../../functions/toApiPath";

export const applyCoupon = async ({
  JWT,
  couponCode,
}: {
  JWT: string;
  couponCode: string;
}) => {
  const res = await fetch(toApiPath(`cart/apply-coupon/${couponCode}`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
