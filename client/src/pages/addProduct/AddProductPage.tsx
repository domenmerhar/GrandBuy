import { Content } from "../../Util/Content";
import { Row } from "../../Util/Row";
import { Modal } from "../../Util/Modal";
import { ProductInfoCard } from "./ProductInfoCard";
import { useState } from "react";
import { CarouselUpload } from "./CarouselUpload";

export const AddProductPage = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  console.log(selectedImages);

  return (
    <Content>
      <Row $gap="2.8rem" $alignItems="center">
        <CarouselUpload
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />

        <Modal>
          <ProductInfoCard />
        </Modal>
      </Row>
    </Content>
  );
};
