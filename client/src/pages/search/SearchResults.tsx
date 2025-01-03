import { Grid } from "../../Util/Grid";
import { ProductCard } from "../../Util/ProductCard";
import { IProductShort } from "../../Util/types";
import { useParams, useSearchParams } from "react-router-dom";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import styled from "styled-components";
import { useProductsInfinite } from "./useProductsInfinite";

const Div = styled.div`
  height: 200px;
`;

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

  const { data, isLoading, isFetching, error, ref } = useProductsInfinite({
    queryName: "products-search",
    query: String(query),
    from,
    to,
    freeShipping,
    sale,
    rating,
  });

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  return (
    <>
      <Grid
        $maxWidth="27rem"
        $minWidth="27rem"
        $colGap="3.2rem"
        $rowGap="3.2rem"
        $margin="4.8rem 0"
      >
        {!isLoading &&
          !error &&
          data?.pages?.map((page) =>
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
      </Grid>
      {isFetching && <SpinnerInBox fullPage={false} />}
      <Div ref={ref}></Div>
    </>
  );
};
