import { useQuery } from "@tanstack/react-query";
import { CardMultipleItems } from "./CardMultipleItems";
import { getProducts } from "../../api/product/getProducts";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { ErrorBox } from "../../Components/ErrorBox";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import { toPrice } from "../../functions/toPrice";
import { IProductShort } from "../../Util/types";
import { useTranslation } from "react-i18next";

/**
 * Komponenta za prikaz izdelkov z brezplačno dostavo.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja izdelke z brezplačno dostavo.
 *
 * @example
 * // Uporaba komponente
 * <FreeShipping />
 */

export const FreeShipping = () => {
  const { t } = useTranslation();

  const { data, error, isLoading } = useQuery({
    queryKey: ["products-free-shipping"],
    queryFn: () =>
      getProducts({
        query: "",
        page: 1,
        freeShipping: true,
      }),
  });

  if (isLoading) return <SpinnerInBox fullPage={false} />;
  if (error) return <ErrorBox fullPage={false} />;
  if (data?.status === "fail") return null;

  return (
    <CardMultipleItems title={t("freeShipping")}>
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
