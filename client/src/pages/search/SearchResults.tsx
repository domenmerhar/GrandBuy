import { Grid } from "../../Util/Grid";
import { ProductCard } from "../../Util/ProductCard";
import { IProductShort } from "../../Util/types";
import { getProducts } from "../../api/getProducts";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";

export const SearchResults = () => {
  const { query } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", query],
    queryFn: () => getProducts(query!, 1),
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
              image={coverImage}
              discount={discount}
              price={totalPrice}
            />
          )
        )}
    </Grid>
  );
};
