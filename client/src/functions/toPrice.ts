type currency = "USD" | "EUR" | "GBP";

/**
 * toPrice funkcija za formatiranje števila v niz s simbolom valute.
 *
 * @param {number} number - Število, ki ga želimo formatirati.
 * @param {currency} currency - Valuta, v kateri želimo prikazati število.
 * @returns {string} - Formatirano število s simbolom valute.
 *
 * @example
 * // Uporaba funkcije
 * const priceUSD = toPrice(19.99, "USD");
 * console.log(priceUSD); // Izpis: "$19.99"
 *
 * const priceEUR = toPrice(24.50, "EUR");
 * console.log(priceEUR); // Izpis: "€24.50"
 *
 * const priceGBP = toPrice(15.75, "GBP");
 * console.log(priceGBP); // Izpis: "£15.75"
 */

export const toPrice = (number: number, currency: currency) => {
  const numberStr = number.toFixed(2).toString();

  switch (currency) {
    case "USD":
      return `$${numberStr}`;
    case "EUR":
      return `${numberStr}€`;
    case "GBP":
      return `£${numberStr}`;
  }
};
