import { forwardRef } from "react";
import { SpinnerInBox } from "./SpinnerInBox";
import { ErrorBox } from "./ErrorBox";
import { ProductGrid } from "../Util/ProductGrid";
import { IProductShort } from "../Util/types";
import { ProductCard } from "../Util/ProductCard";
import { toApiFilesPath } from "../functions/toApiFilesPath";
import { InfiniteDiv } from "../Util/InfiniteDiv";

interface InfiniteProductsProps {
  data: unknown;
  isLoading: boolean;
  error: unknown;
  isFetching: boolean;
  renderFn?: (page: unknown) => typeof ProductCard;
}

export const InfiniteProducts = forwardRef<
  HTMLDivElement,
  InfiniteProductsProps
>(({ data, isLoading, isFetching, error, renderFn }, ref) => {
  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  return (
    <>
      <ProductGrid>
        {!isLoading &&
          !error &&
          data?.pages?.map(
            renderFn
              ? renderFn
              : (page) =>
                  page?.data?.products?.map(
                    ({
                      _id,
                      name,
                      coverImage,
                      discount,
                      totalPrice,
                    }: IProductShort) => (
                      <ProductCard
                        key={_id}
                        id={_id}
                        title={name}
                        image={toApiFilesPath(coverImage)}
                        discount={discount}
                        price={totalPrice}
                      />
                    )
                  )
          )}
      </ProductGrid>
      {isFetching && <SpinnerInBox fullPage={false} />}
      <InfiniteDiv ref={ref}></InfiniteDiv>
    </>
  );
});
