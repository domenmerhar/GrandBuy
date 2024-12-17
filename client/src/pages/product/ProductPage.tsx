import { Content } from "../../Util/Content";
import { ImageCarousel } from "./ImageCarousel";
import { MoreFromSellerSection } from "./MoreFromSellerSection";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { ProductFilter } from "../../Util/ProductFilter";
import { Row } from "../../Util/Row";

export const ProductPage = () => {
  return (
    <Content>
      <Row $gap="2.8rem">
        <ImageCarousel />
        <StyledSidebar $position="sticky" $height="80vh">
          <ProductFilter />
        </StyledSidebar>
      </Row>
      <MoreFromSellerSection />
    </Content>
  );
};
