import { ProductFilter } from "../../Components/ProductFilter";
import { Sidebar } from "../../Components/Sidebar";

/**
 * Komponenta za prikaz stranske vrstice iskanja izdelkov.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja stransko vrstico iskanja izdelkov.
 *
 * @example
 * // Uporaba komponente
 * <SearchSidebar />
 */

export const SearchSidebar = () => {
  return (
    <Sidebar>
      <ProductFilter freeShipping rating price sale />
    </Sidebar>
  );
};
