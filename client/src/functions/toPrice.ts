type currency = "USD" | "EUR" | "GBP";

export const toPrice = (number: number, currency: currency) => {
  const numberStr = number.toFixed(2).toString();

  switch (currency) {
    case "USD":
      return `$${numberStr}`;
    case "EUR":
      return `€${numberStr}`;
    case "GBP":
      return `£${numberStr}`;
  }
};
