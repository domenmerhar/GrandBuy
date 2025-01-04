import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/getProducts";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { CardMultipleItems } from "./CardMultipleItems";
import { IProductShort } from "../../Util/types/index";
import { toPrice } from "../../functions/toPrice";
import { toApiFilesPath } from "../../functions/toApiFilesPath";

export const Under50 = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products-under-x"],
    queryFn: () =>
      getProducts({
        query: "",
        page: 1,
        to: 50,
        sort: "-totalPrice",
        limit: 2,
      }),
  });

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;
  if (data?.status === "fail") return null;

  return (
    <CardMultipleItems title="Under $50">
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
