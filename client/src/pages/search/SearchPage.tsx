import { IOption } from "../../Util/types";
import { Select } from "../../Util/Select";
import { SearchSidebar } from "./SearchSidebar";
import { Grid } from "../../Util/Grid";
import { ProductCard } from "../../Util/ProductCard";
import { ContentWithSidebar } from "../../Util/ContentWithSidebar";
import { SidebarLayout } from "../../Util/SidebarLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProducts } from "../../api/getProduct";
import { IProductShort } from "../../Util/types/index";

const selectOptions: IOption[] = [
  { name: "Sort by most orders", value: "-orders" },
  { name: "Sort by least orders", value: "orders" },
  { name: "Sort by most expensive", value: "-price" },
  { name: "Sort by cheapest", value: "price" },
  { name: "Sort by date (youngest)", value: "-createdAt" },
  { name: "Sort by date (oldest)", value: "createdAt" },
];

export const SearchPage = () => {
  const { query } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", query],
    queryFn: () => getProducts(query!, 1),
  });

  // console.log(data.products);

  return (
    <SidebarLayout>
      <SearchSidebar />
      <ContentWithSidebar>
        <Select options={selectOptions} />

        <Grid
          $maxWidth="27rem"
          $minWidth="27rem"
          $colGap="3.2rem"
          $rowGap="3.2rem"
          $margin="4.8rem 0"
        >
          {isLoading && <div>Loading...</div>}
          {!isLoading &&
            !error &&
            data.data &&
            data.data.products.map(
              ({
                id,
                name,
                coverImage,
                discount,
                totalPrice,
              }: IProductShort) => (
                <ProductCard
                  id={id}
                  title={name}
                  image={coverImage}
                  discount={discount}
                  price={totalPrice}
                />
              )
            )}
        </Grid>
      </ContentWithSidebar>
    </SidebarLayout>
  );
};
