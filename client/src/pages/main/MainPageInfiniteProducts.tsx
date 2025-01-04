import { getProducts } from "../../api/getProducts";
import { ErrorBox } from "../../Components/ErrorBox";
import { InfiniteProducts } from "../../Components/InfiniteProducts";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { useInfinite } from "../../hooks/useInfinite";

const queryFn = ({ pageParam }: unknown) => {
  if (pageParam === null) return;

  return getProducts({
    query: "",
    page: Number(pageParam),
    sort: "-orders",
  });
};

export const MainPageInfiniteProducts = () => {
  const { data, error, isLoading, isFetching, ref } = useInfinite({
    queryKey: ["main-page-infinite-products"],
    queryFn,
  });

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  return (
    <InfiniteProducts
      data={data}
      isFetching={isFetching}
      ref={ref}
      error={error}
      isLoading={isLoading}
    />
  );
};
