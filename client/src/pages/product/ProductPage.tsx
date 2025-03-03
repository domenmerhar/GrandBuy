import { Content } from "../../Util/Content";
import { MoreFromSellerSection } from "./MoreFromSellerSection";
import { SliderInfoRow } from "./SliderInfoRow";
import { ProductDescription } from "./ProductDescription";
import { Column } from "../../Util/Column";
import { ReviewSection } from "./ReviewSection";
import { useProduct } from "./useProduct";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { toPrice } from "../../functions/toPrice";
import { toDate } from "../../functions/toDate";
import { toApiFilesPath } from "../../functions/toApiFilesPath";
import { ErrorBox } from "../../Components/ErrorBox";
import { ProductPageInfiniteProducts } from "./ProductPageInfiniteProducts";
import { Modal } from "../../Components/Modal";
import EditProductModal from "./EditProductModal";

interface IProductDetails {
  isSelling: boolean;
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  name: string;
  coverImage: string;
  images: string[];
  price: number;
  shipping: number;
  discount: number;
  description: string;
  lastChanged: string;
  totalPrice: number;
  orders: number;
}

/**
 * Komponenta za prikaz strani izdelka.
 *
 * @component
 * @returns {JSX.Element} JSX element, ki predstavlja stran izdelka.
 *
 * @example
 * // Uporaba komponente
 * <ProductPage />
 */

export const ProductPage = () => {
  const { data, isLoading, error } = useProduct();

  if (isLoading)
    return (
      <Content>
        <SpinnerInBox />
      </Content>
    );

  if (error || !data?.data) return <ErrorBox />;

  const {
    description,
    images,
    lastChanged,
    name,
    orders,
    price,
    shipping,
    user: { username },
    discount,
  } = data?.data?.product as IProductDetails;

  const markdownPath = toApiFilesPath(description);
  const imagesPath = images.map((image) => toApiFilesPath(image));

  return (
    <Modal>
      <Content>
        <Column $gap="6.4rem">
          <SliderInfoRow
            images={imagesPath}
            title={name}
            averageRating="N/A"
            createdBy={username}
            uploaded={toDate(lastChanged)}
            price={toPrice(price, "USD")}
            shipping={toPrice(shipping, "USD")}
            unitsSold={String(orders)}
            discount={discount}
          />
          <ProductDescription markdownSrc={markdownPath} />
          <ReviewSection />
          <MoreFromSellerSection />
          <ProductPageInfiniteProducts />
        </Column>
      </Content>

      <EditProductModal />
    </Modal>
  );
};
