import { IProductShort } from "./types";
import { ProductCard } from "../Components/Card/ProductCard";
import { toApiFilesPath } from "../functions/toApiFilesPath";

/**
 * Funkcija za upodabljanje izdelkov.
 *
 * @param {Object} page - Stran s podatki o izdelkih.
 * @returns {JSX.Element[]} Seznam JSX elementov, ki predstavljajo izdelke.
 *
 * @example
 * // Uporaba funkcije
 * const renderedProducts = renderProduct(page);
 */

export const renderProduct = (page: any) =>
  page?.data?.products?.map(
    ({ _id, name, coverImage, discount, totalPrice }: IProductShort) => (
      <ProductCard
        key={_id}
        id={_id}
        title={name}
        image={toApiFilesPath(coverImage)}
        discount={discount}
        price={totalPrice}
      />
    )
  );
