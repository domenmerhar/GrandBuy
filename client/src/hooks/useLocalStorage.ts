import { useState, useEffect } from "react";

/**
 * useLocalStorage hook za uporabo lokalnega pomnilnika za shranjevanje in pridobivanje podatkov.
 *
 * @param {unknown} initialState - Začetna vrednost, ki se uporabi, če vrednost v lokalnem pomnilniku ne obstaja.
 * @param {string} key - Ključ, pod katerim se podatki shranjujejo v lokalni pomnilnik.
 * @returns {[unknown, function]} - Vrne polje z dvema elementoma: vrednostjo in funkcijo za nastavitev vrednosti.
 *
 * @example
 * // Uporaba hook-a
 * const [name, setName] = useLocalStorage("John", "userName");
 * return (
 * <div>
 * <p>Name: {name}</p>
 * <input value={name} onChange={e => setName(e.target.value)} />
 * </div>
 * );
 */

export function useLocalStorage(initialState: unknown, key: string) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
