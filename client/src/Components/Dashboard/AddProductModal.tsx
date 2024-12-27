import styled from "styled-components";
import { Column } from "../../Util/Column";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { Modal } from "../../Util/Modal";
import { useRef } from "react";
import { ImagePicker } from "../ImagePicker";

const Content = styled(Column)`
  & label {
    margin-bottom: -8px;
  }
`;

export const AddProductModal = () => {
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

        <ImagePicker />
      </Content>
    </Modal.Window>
  );
};
