import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/product/getProducts";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import HorizontalProducts from "./HorizontalProducts";

export const LatestProducts = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products-latest"],
    queryFn: () =>
      getProducts({
        query: "",
        page: 1,
        limit: 20,
        sort: "-createdAt",
      }),
  });

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;
  if (data?.status === "fail") return null;

  return <HorizontalProducts products={data?.data?.products} />;
};
