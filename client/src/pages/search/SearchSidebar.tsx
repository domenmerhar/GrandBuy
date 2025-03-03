import { ProductFilter } from "../../Components/ProductFilter";
import { Sidebar } from "../../Components/Sidebar";

export const SearchSidebar = () => {
  return (
    <Sidebar>
      <ProductFilter freeShipping rating price sale />
    </Sidebar>
  );
};
