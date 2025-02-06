import { forwardRef, ReactNode } from "react";
import { SpinnerInBox } from "./SpinnerInBox";
import { ErrorBox } from "./ErrorBox";
import { InfiniteDiv } from "../Util/InfiniteDiv";

interface InfiniteProductsProps {
  data: unknown;
  isLoading: boolean;
  error: unknown;
  isFetching: boolean;
  renderFn: (page: any) => unknown;
  container?: React.ComponentType<{ children: ReactNode }>;
}

export const InfiniteProducts = forwardRef<
  HTMLDivElement,
  InfiniteProductsProps
>(({ data, isLoading, isFetching, error, renderFn, container }, ref) => {
  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  const Container = container
    ? container
    : ({ children }: { children: ReactNode[] | ReactNode | string }) => (
        <>{children}</>
      );

  if (!isLoading && !error && !data?.pages?.length) return null;

  return (
    <>
      <Container>
        {!isLoading && !error && data?.pages && data?.pages?.map(renderFn)}
      </Container>
      {isFetching && <SpinnerInBox fullPage={false} />}
      <InfiniteDiv ref={ref}></InfiniteDiv>
    </>
  );
});
