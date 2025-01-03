import { Header } from "../../Util/Header";
import { Grid } from "../../Util/Grid";
import { ProductCard } from "../../Util/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/getProducts";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { IProductShort } from "../../Util/types/index";
import { toApiFilesPath } from "../../functions/toApiFilesPath";

export const SaleSection = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products-sale"],
    queryFn: () =>
      getProducts({
        page: 1,
        query: "",
        sale: true,
        sort: "-discount",
        limit: 20,
      }),
  });

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;

  return (
    <>
      <Header $color="orange" $size="medium" id="sale">
        Summer Sale
      </Header>
      <Grid
        $maxWidth="27rem"
        $minWidth="27rem"
        $colGap="3.2rem"
        $rowGap="3.2rem"
        $margin="4.8rem 0"
      >
        {data?.data?.products?.map(
          ({ _id, coverImage, discount, name, totalPrice }: IProductShort) => (
            <ProductCard
              key={_id}
              id={_id}
              title={name}
              price={totalPrice}
              image={toApiFilesPath(coverImage)}
              discount={discount}
            />
          )
        )}
      </Grid>
    </>
  );
};
