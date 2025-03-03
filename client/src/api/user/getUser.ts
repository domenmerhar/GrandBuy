import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi podatke o uporabniku s podanim ID-jem in vlogo.
 * @param {string} id - ID uporabnika, katerega podatke želimo pridobiti.
 * @param {"user" | "seller"} role - Vloga uporabnika (uporabnik ali prodajalec).
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await getUser('123456', 'user');
 */

export const getUser = async (id: string, role: "user" | "seller") => {
  const response = await fetch(toApiPath(`user/id/${id}?role=${role}`));
  const data = await response.json();

  return data;
};
