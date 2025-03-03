import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/product/getProducts";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import HorizontalProducts from "./HorizontalProducts";

/**
 * Komponenta za prikaz zadnjih izdelkov.
 *
 * @component
 * @returns {JSX.Element} JSX element, ki predstavlja zadnje izdelke.
 *
 * @example
 * // Uporaba komponente
 * <LatestProducts />
 */


export const LatestProducts = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products-latest"],
    queryFn: () =>
      getProducts({
        query: "",
        page: 1,
        sort: "-createdAt",
      }),
  });

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;
  if (data?.status === "fail") return null;

  return <HorizontalProducts products={data?.data?.products} />;
};
