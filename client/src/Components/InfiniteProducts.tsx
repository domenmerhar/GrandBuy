import { forwardRef, ReactNode } from "react";
import { SpinnerInBox } from "./SpinnerInBox";
import { ErrorBox } from "./ErrorBox";
import { IProductShort } from "../Util/types";
import { ProductCard } from "../Util/ProductCard";
import { toApiFilesPath } from "../functions/toApiFilesPath";
import { InfiniteDiv } from "../Util/InfiniteDiv";

interface InfiniteProductsProps {
  data: unknown;
  isLoading: boolean;
  error: unknown;
  isFetching: boolean;
  renderFn?: (page: any) => unknown;
  container: React.ComponentType<{ children: ReactNode }>;
}

export const InfiniteProducts = forwardRef<
  HTMLDivElement,
  InfiniteProductsProps
>(({ data, isLoading, isFetching, error, renderFn, container }, ref) => {
  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  const Container = container;

  return (
    <>
      <Container>
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
      </Container>
      {isFetching && <SpinnerInBox fullPage={false} />}
      <InfiniteDiv ref={ref}></InfiniteDiv>
    </>
  );
});
