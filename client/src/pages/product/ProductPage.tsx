import { Content } from "../../Util/Content";
import { ImageCarousel } from "./ImageCarousel";
import { MoreFromSellerSection } from "./MoreFromSellerSection";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { Row } from "../../Util/Row";
import { SaleSection } from "../main/SaleSection";
import { ProductInfo } from "./ProductInfo";

export const ProductPage = () => {
  return (
    <Content>
      <Row $gap="2.8rem" $alignItems="center">
        <ImageCarousel />
        <StyledSidebar $position="sticky" $height="75vh">
          <ProductInfo />
        </StyledSidebar>
      </Row>

      <MoreFromSellerSection />

      <SaleSection />
    </Content>
  );
};
