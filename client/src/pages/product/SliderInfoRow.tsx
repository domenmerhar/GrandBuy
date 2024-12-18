import { Row } from "../../Util/Row";
import { ImageCarousel } from "./ImageCarousel";
import styled from "styled-components";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { ProductInfo } from "./ProductInfo";

const ProducInfoHolder = styled(StyledSidebar)`
  align-self: flex-start;
`;

export const SliderInfoRow = () => {
  return (
    <Row $gap="2.8rem" $alignItems="center">
      <ImageCarousel />
      <ProducInfoHolder $position="sticky" $height="400px">
        <ProductInfo />
      </ProducInfoHolder>
    </Row>
  );
};
