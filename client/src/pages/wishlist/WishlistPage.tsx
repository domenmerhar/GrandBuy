import { Content } from "../../Util/Content";
import { Stepper } from "../../Util/Stepper";
import { CardFilterGrid } from "../../Util/CardFilterGrid";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { ProductFilter } from "../../Util/ProductFilter";
import { ProductsCard } from "../../Util/ProductsCard";
import { CartItem } from "../Cart/CartItem";
import { useWishlistItemCount } from "../../hooks/wishlist/useWishlistItemCount";

export const WishlistPage = () => {
  const { data } = useWishlistItemCount();

  return (
    <Content>
      <CardFilterGrid>
        <ProductsCard title="Wishlist" itemCount={data?.data?.items || 0}>
          <CartItem />
        </ProductsCard>

        <StyledSidebar $position="sticky" $width="auto" $height="80vh">
          <ProductFilter freeShipping price sale />
        </StyledSidebar>
        <Stepper searchParamName="page" max={10} />
      </CardFilterGrid>
    </Content>
  );
};
