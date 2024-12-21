import { Content } from "../../Util/Content";
import { Stepper } from "../../Util/Stepper";
import { CardFilterGrid } from "../../Util/CardFilterGrid";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { ProductFilter } from "../../Util/ProductFilter";
import { ProductsCard } from "../../Util/ProductsCard";
import { CartItem } from "../Cart/CartItem";

export const WishlistPage = () => {
  return (
    <Content>
      <CardFilterGrid>
        <ProductsCard title="Wishlist" items={2}>
          <CartItem />
        </ProductsCard>

        <StyledSidebar $position="sticky" $width="auto" $height="80vh">
          <ProductFilter />
        </StyledSidebar>
        <Stepper searchParamName="page" max={10} />
      </CardFilterGrid>
    </Content>
  );
};
