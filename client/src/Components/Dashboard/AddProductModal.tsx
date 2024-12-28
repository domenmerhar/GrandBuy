import styled from "styled-components";
import { Column } from "../../Util/Column";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { Modal } from "../../Util/Modal";
import { useRef, useState } from "react";
import { ImagePicker } from "../ImagePicker";

const Content = styled(Column)`
  & label {
    margin-bottom: -8px;
  }
`;

export const AddProductModal = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const productRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const shippingRef = useRef<HTMLInputElement>(null);

  return (
    <Modal.Window title="Add Product">
      <Content $gap="1.2rem">
        <InputWithLabel
          id="product-name"
          placeholder="guitar"
          title="Product name"
          type="text"
          ref={productRef}
        />

        <InputWithLabel
          id="price"
          placeholder="10.99"
          title="Price"
          type="number"
          ref={priceRef}
        />

        <InputWithLabel
          id="shipping"
          placeholder="2.99"
          title="Shipping"
          type="number"
          ref={shippingRef}
        />

        <ImagePicker setSelectedImages={setSelectedImages} />

        {selectedImages.length > 0 && (
          <div>
            {selectedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Selected ${index}`}
                style={{
                  width: "200px",
                  objectFit: "cover",
                  margin: "5px",
                }}
              />
            ))}
          </div>
        )}
      </Content>
    </Modal.Window>
  );
};
