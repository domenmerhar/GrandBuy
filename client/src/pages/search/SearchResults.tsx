import { Grid } from "../../Util/Grid";
import { ProductCard } from "../../Util/ProductCard";
import { IProductShort } from "../../Util/types";
import { getProducts } from "../../api/getProducts";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { toApiFilesPath } from "../../functions/toApiFilesPath";

export const SearchResults = () => {
  const { query } = useParams();
  const [searchParams] = useSearchParams();

  const [from, to, freeShipping, sale, rating] = [
    Number(searchParams.get("from")),
    Number(searchParams.get("to")),
    searchParams.get("free-shipping") === "true",
    searchParams.get("sale") === "true",
    Number(searchParams.get("rating")),
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "products-search",
      query,
      1,
      from,
      to,
      freeShipping,
      sale,
      rating,
    ],
    queryFn: () => {
      return getProducts({
        query: String(query),
        page: 1,
        from,
        to,
        freeShipping,
        sale,
        rating,
      });
    },
  });

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  return (
    <Grid
      $maxWidth="27rem"
      $minWidth="27rem"
      $colGap="3.2rem"
      $rowGap="3.2rem"
      $margin="4.8rem 0"
    >
      {!isLoading &&
        !error &&
        data.data &&
        data.data.products.map(
          ({ _id, name, coverImage, discount, totalPrice }: IProductShort) => (
            <ProductCard
              key={_id}
              id={_id}
              title={name}
              image={toApiFilesPath(coverImage)}
              discount={discount}
              price={totalPrice}
            />
          )
        )}
    </Grid>
  );
};
