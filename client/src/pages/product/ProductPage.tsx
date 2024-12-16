import { Content } from "../../Util/Content";
import { ImageCarousel } from "./ImageCarousel";
import { MoreFromSellerSection } from "./MoreFromSellerSection";

export const ProductPage = () => {
  return (
    <Content>
      <ImageCarousel />
      <MoreFromSellerSection />
    </Content>
  );
};
