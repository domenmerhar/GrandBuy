import { toApiPath } from "../../functions/toApiPath";

export default async (JWT: string) => {
  const response = await fetch(toApiPath(`coupon/seller/highest-discount`), {
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await response.json();

  return data;
};
