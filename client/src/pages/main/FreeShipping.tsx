import { useQuery } from "@tanstack/react-query";
import { CardMultipleItems } from "./CardMultipleItems";
import { getProducts } from "../../api/getProducts";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import { toPrice } from "../../functions/toPrice";
import { IProductShort } from "../../Util/types";

export const FreeShipping = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products-free-shipping"],
    queryFn: () =>
      getProducts({
        query: "",
        page: 1,
        freeShipping: true,
        limit: 4,
      }),
  });

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;
  if (data?.status === "fail") return null;

  return (
    <CardMultipleItems title="Free Shipping">
      {data?.data?.products?.map(
        ({ _id, coverImage, discount, name, totalPrice }: IProductShort) => (
          <CardMultipleItems.Product
            key={_id}
            id={_id}
            productName={name}
            imageSrc={toApiFilesPath(coverImage)}
            priceAfterDiscount={toPrice(totalPrice, "USD")}
            priceBeforeDiscount={toPrice(
              totalPrice / ((100 - discount) / 100),
              "USD"
            )}
          />
        )
      )}
    </CardMultipleItems>
  );
};
