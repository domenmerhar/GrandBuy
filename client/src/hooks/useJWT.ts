import { useState } from "react";

/**
 * useJWT hook za upravljanje JWT (JSON Web Token) v lokalnem pomnilniku.
 *
 * @returns {object} - Objekt, ki vsebuje `JWT` in `setJWT` funkcijo.
 *
 * @example
 * // Uporaba hook-a
 * const { JWT, setJWT } = useJWT();
 * if (JWT) {
 * // Uporabnik je avtenticiran
 * } else {
 * // Uporabnik ni avtenticiran
 * }
 * setJWT("your_jwt_token"); // Nastavi JWT
 */

export const useJWT = () => {
  const [JWT, setJWT] = useState<string>(
    () => localStorage.getItem("JWT") || ""
  );

  return { JWT, setJWT };
};
