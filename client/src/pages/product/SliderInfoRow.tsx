import { Row } from "../../Util/Row";
import { ImageCarousel } from "./ImageCarousel";
import styled from "styled-components";
import { StyledSidebar } from "../../Util/StyledSidebar";
import { ProductInfo } from "../../Components/ProductInfo";
import { FC } from "react";

const ProductInfoHolder = styled(StyledSidebar)`
  align-self: flex-start;
`;

const NoImage = styled.div`
  width: 100%;
  height: 100%;
`;

interface SliderInfoRowProps {
  images: string[];
  title: string;
  price: string;
  shipping: string;
  averageRating: string;
  unitsSold: string;
  createdBy: string;
  uploaded: string;
  discount: number;
}

export const SliderInfoRow: FC<SliderInfoRowProps> = ({
  images,
  title,
  price,
  shipping,
  averageRating,
  unitsSold,
  createdBy,
  uploaded,
  discount,
}) => {
  return (
    <Row $gap="2.8rem" $alignItems="center">
      {images?.length > 0 ? (
        <ImageCarousel images={images} />
      ) : (
        <NoImage></NoImage>
      )}
      <ProductInfoHolder $position="sticky" $height="auto" $rounded>
        <ProductInfo
          title={title}
          price={price}
          shipping={shipping}
          averageRating={averageRating}
          unitsSold={unitsSold}
          createdBy={createdBy}
          uploaded={uploaded}
          discount={discount}
        />
      </ProductInfoHolder>
    </Row>
  );
};
