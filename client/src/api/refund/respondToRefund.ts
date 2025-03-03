import { toApiPath } from "../../functions/toApiPath";

/**
 * Odgovori na zahtevo za vračilo.
 * @param {object} arguments - Argumenti za odgovor na zahtevo za vračilo.
 * @param {string} arguments.refundId - ID zahteve za vračilo.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @param {"approved" | "rejected"} arguments.status - Status odgovora (odobreno ali zavrnjeno).
 * @param {string} arguments.resolvedMessage - Sporočilo prodajalca glede odgovora.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await respondToRefund({
 *  refundId: '123456',
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  status: 'approved',
 *  resolvedMessage: 'Vračilo je odobreno.'
 * });
 */

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
