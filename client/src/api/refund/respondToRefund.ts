import { toApiPath } from "../../functions/toApiPath";

export default async function respondToRefund({
  refundId,
  JWT,
  status,
  resolvedMessage,
}: {
  refundId: string;
  JWT: string;
  status: "approved" | "rejected";
  resolvedMessage: string;
}) {
  const body = JSON.stringify({ status, resolvedMessage });

  const res = await fetch(toApiPath(`refund/${refundId}/respond`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.json();

  return data;
}
