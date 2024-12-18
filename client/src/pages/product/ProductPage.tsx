import { Content } from "../../Util/Content";
import { ImageCarousel } from "./ImageCarousel";
import { MoreFromSellerSection } from "./MoreFromSellerSection";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { Row } from "../../Util/Row";
import { SaleSection } from "../main/SaleSection";
import { ProductInfo } from "./ProductInfo";
import styled from "styled-components";

const ProducInfoHolder = styled(StyledSidebar)`
  align-self: flex-start;
`;

export const ProductPage = () => {
  return (
    <Content>
      <Row $gap="2.8rem" $alignItems="center">
        <ImageCarousel />
        <ProducInfoHolder $position="sticky" $height="400px">
          <ProductInfo />
        </ProducInfoHolder>
      </Row>

      <MoreFromSellerSection />

      <SaleSection />
    </Content>
  );
};
