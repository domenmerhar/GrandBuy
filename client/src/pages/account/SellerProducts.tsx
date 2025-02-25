import { useParams } from "react-router-dom";
import { useInfinite } from "../../hooks/useInfinite";
import { InfiniteProducts } from "../../Components/InfiniteProducts";
import { renderProduct } from "../../Util/renderProduct";
import { ProductGrid } from "../../Util/ProductGrid";
import { getSellerProducts } from "../../api/product/getSellerProducts";

export const SellerProducts = () => {
  const { userId } = useParams();

  const queryFn = ({ pageParam }: { pageParam: unknown }) => {
    if (pageParam === null) return;

    return getSellerProducts(userId!, Number(pageParam));
  };

  const data = useInfinite({
    queryFn,
    queryKey: ["seller-page-products", userId],
  });

  return (
    <InfiniteProducts
      {...data}
      renderFn={renderProduct}
      container={ProductGrid}
    />
  );
};
