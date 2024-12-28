import { Content } from "../../Util/Content";
import { Row } from "../../Util/Row";
import { Modal } from "../../Util/Modal";
import { ProductInfoCard } from "./ProductInfoCard";
import { useState } from "react";
import { CarouselUpload } from "./CarouselUpload";
import { MarkdownFileUploader } from "./MarkdownFileUploader";
import styled from "styled-components";

const CarouselCardRow = styled(Row)`
  margin-bottom: 6.4rem;
`;

export const AddProductPage = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  console.log(selectedImages);

  return (
    <Content>
      <CarouselCardRow $gap="2.8rem" $alignItems="center">
        <CarouselUpload
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />

        <Modal>
          <ProductInfoCard />
        </Modal>
      </CarouselCardRow>

      <MarkdownFileUploader />
    </Content>
  );
};
