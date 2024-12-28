import { Content } from "../../Util/Content";
import { Row } from "../../Util/Row";
import { ImageCarousel } from "../product/ImageCarousel";
import { Modal } from "../../Util/Modal";
import { ProductInfoCard } from "./ProductInfoCard";
import { ImagePicker } from "../../Components/ImagePicker";
import { Column } from "../../Util/Column";
import { useState } from "react";
import styled from "styled-components";

const ImagesColumn = styled(Column)`
  width: 100%;
`;

export const AddProductPage = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  return (
    <Content>
      <Row $gap="2.8rem" $alignItems="center">
        <ImagesColumn $gap="1.2rem">
          <ImageCarousel images={selectedImages} />
          <ImagePicker setSelectedImages={setSelectedImages} />
        </ImagesColumn>

        <Modal>
          <ProductInfoCard />
        </Modal>
      </Row>
    </Content>
  );
};
