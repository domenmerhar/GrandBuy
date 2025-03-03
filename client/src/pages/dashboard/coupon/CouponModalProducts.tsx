import { InfiniteProducts } from "../../../Components/InfiniteProducts";
import { useInfinite } from "../../../hooks/useInfinite";
import { useMe } from "../../../hooks/useMe";
import getSellerProductList from "../../../api/product/getSellerProductList";
import { CheckboxWithText } from "../../../Components/CheckboxWithText";
import { Dispatch, SetStateAction } from "react";

interface ProductShort {
  _id: string;
  name: string;
}

interface CouponModalProductsProps {
  productIds: string[];
  setProductIds: Dispatch<SetStateAction<string[]>>;
}

/**
 * Komponenta za upravljanje izdelkov v modalnem oknu za kupon.
 *
 * @component
 * @param {Object} props - Lastnosti komponente.
 * @param {string[]} props.productIds - Seznam ID-jev izdelkov, na katere kupon vpliva.
 * @param {Function} props.setProductIds - Funkcija za nastavitev ID-jev izdelkov, na katere kupon vpliva.
 * @returns {JSX.Element} JSX element, ki predstavlja modalno okno za upravljanje izdelkov kupona.
 *
 * @example
 * // Uporaba komponente
 * <CouponModalProducts productIds={["1", "2"]} setProductIds={() => {}} />
 */

export default function CouponModalProducts({
  productIds,
  setProductIds,
}: CouponModalProductsProps) {
  const { data } = useMe();
  const sellerId = data?.data?._id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) return setProductIds((prev) => [...prev, e.target.id]);

    setProductIds((prev) =>
      prev.filter((productId) => productId !== e.target.id)
    );
  };

  const queryFn = ({ pageParam }: { pageParam: unknown }) => {
    if (pageParam === null) return;

    return getSellerProductList(sellerId, Number(pageParam));
  };

  const infiniteData = useInfinite({
    queryFn,
    queryKey: ["seller-product-list", sellerId],
  });

  const renderFn = ({ data }: { data: { products: [ProductShort] } }) =>
    data?.products?.map(({ _id, name }: ProductShort) => (
      <CheckboxWithText
        key={_id}
        id={_id}
        label={name}
        onChange={handleChange}
        checked={productIds.includes(_id)}
      />
    ));

  return <InfiniteProducts {...infiniteData} renderFn={renderFn} />;
}
