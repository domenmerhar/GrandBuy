import { IProductShort } from "./types";
import { ProductCard } from "../Components/Card/ProductCard";
import { toApiFilesPath } from "../functions/toApiFilesPath";

export const renderProduct = (page: any) =>
  page?.data?.products?.map(
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
  );
