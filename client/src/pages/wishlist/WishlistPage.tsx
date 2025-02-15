import { Content } from "../../Util/Content";
import { Stepper } from "../../Util/Stepper";
import { CardFilterGrid } from "../../Util/CardFilterGrid";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { ProductFilter } from "../../Util/ProductFilter";
import { ProductsCard } from "../../Util/ProductsCard";
import { useWishlistItems } from "../../hooks/wishlist/useWishlistItems";
import { WishlistItems } from "./WishlistItems";
import { useTranslation } from "react-i18next";

export const WishlistPage = () => {
  const { t } = useTranslation();

  const { data } = useWishlistItems();

  const itemCount = data?.totalItems || 0;
  const max = data?.totalItems
    ? Math.ceil(data?.totalItems / import.meta.env.VITE_PRODUCTS_PER_STEPPER)
    : 1;

  return (
    <Content>
      <CardFilterGrid>
        <ProductsCard title={t("wishlist")} itemCount={itemCount}>
          <WishlistItems />
        </ProductsCard>

        <StyledSidebar $position="sticky" $width="auto" $height="80vh">
          <ProductFilter freeShipping price sale />
        </StyledSidebar>
        <Stepper searchParamName="page" max={max} />
      </CardFilterGrid>
    </Content>
  );
};
