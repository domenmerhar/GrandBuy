import { toApiPath } from "../../functions/toApiPath";
import { NotificationType } from "../../Util/types";

/**
 * Pridobi obvestila uporabnika s podporo za filtriranje, sortiranje in paginacijo.
 * @param {object} arguments - Argumenti za pridobivanje obvestil.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {number} arguments.page - Številka strani za paginacijo.
 * @param {NotificationType | "all"} arguments.type - Tip obvestil (message, warning, ali "all" za vsa obvestila).
 * @param {"-createdAt" | "+createdAt"} arguments.sort - Način sortiranja obvestil (po datumu ustvarjanja, padajoče ali naraščajoče).
 * @returns {Promise<any>} - Odgovor strežnika, vključno s podatkom o naslednji strani.
 * @async
 * @example
 * await getYourNotifications({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  page: 1,
 *  type: 'message',
 *  sort: '-createdAt'
 * });
 */

export const getYourNotifications = async ({
  JWT,
  page,
  sort,
  type,
}: {
  JWT: string;
  page: number;
  type: NotificationType & "all";
  sort: "-createdAt" | "+createdAt";
}) => {
  const limit = Number(import.meta.env.VITE_REFUNDS_NOTIFICATIONS_PAGE_SIZE);

  const res = await fetch(
    toApiPath(
      `notification/?page=${page}&limit=${limit}&sort=${sort}${["message", "warning"].includes(type) ? `&type=${type}` : ""}`
    ),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
  );

  const data = await res.json();
  const nextItem = data?.data?.notifications.length === limit ? page + 1 : null;

  return { ...data, nextItem };
};
