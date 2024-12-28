import { Content } from "../../Util/Content";
import { Row } from "../../Util/Row";
import { ImageCarousel } from "../product/ImageCarousel";
import { Modal } from "../../Util/Modal";
import { ProductInfoCard } from "./ProductInfoCard";
import { Column } from "../../Util/Column";
import { useState } from "react";
import styled from "styled-components";
import { FilePicker } from "../../Components/FilePicker";

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
          <FilePicker setSelectedFiles={setSelectedImages} multiple />
        </ImagesColumn>

        <Modal>
          <ProductInfoCard />
        </Modal>
      </Row>
    </Content>
  );
};
