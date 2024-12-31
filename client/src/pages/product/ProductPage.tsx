import { Content } from "../../Util/Content";
import { MoreFromSellerSection } from "./MoreFromSellerSection";
import { SaleSection } from "../main/SaleSection";
import { SliderInfoRow } from "./SliderInfoRow";
import { ProductDescription } from "./ProductDescription";
import { Column } from "../../Util/Column";
import { ReviewSection } from "./ReviewSection";
import { useProduct } from "./useProduct";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { toPrice } from "../../functions/toPrice";
import { toDate } from "../../functions/toDate";
import { toApiFilesPath } from "../../functions/toApiFilesPath";

interface IProductDetails {
  isSelling: boolean;
  _id: string;
  user: string;
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

export const ProductPage = () => {
  const { data, isLoading, error } = useProduct();

  if (isLoading)
    return (
      <Content>
        <SpinnerInBox />
      </Content>
    );

  const {
    description,
    images,
    lastChanged,
    name,
    orders,
    price,
    shipping,
    user,
  } = data.data.product as IProductDetails;

  const markdownPath = toApiFilesPath(description);
  const imagesPath = images.map((image) => toApiFilesPath(image));

  console.log(imagesPath);

  return (
    <>
      <Content>
        <Column $gap="6.4rem">
          <SliderInfoRow
            images={imagesPath}
            title={name}
            averageRating="N/A"
            createdBy={user}
            uploaded={toDate(lastChanged)}
            price={toPrice(price, "USD")}
            shipping={toPrice(shipping, "USD")}
            unitsSold={String(orders)}
          />
          <ProductDescription markdownSrc={markdownPath} />
          <ReviewSection />
          <MoreFromSellerSection />
          <SaleSection />
        </Column>
      </Content>
    </>
  );
};
