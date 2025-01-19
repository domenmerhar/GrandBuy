import { ProductFilter } from "../../Util/ProductFilter";
import { Sidebar } from "../../Util/Sidebar";

export const SearchSidebar = () => {
  return (
    <Sidebar>
      <ProductFilter freeShipping rating price sale />
    </Sidebar>
  );
};
