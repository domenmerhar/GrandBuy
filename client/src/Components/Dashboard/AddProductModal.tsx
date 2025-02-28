import styled from "styled-components";
import { Column } from "../../Util/Column";
import { Modal } from "../../Util/Modal";
import { useRef, useState } from "react";
import { useJWT } from "../../hooks/useJWT";
import { useAddProduct } from "../../hooks/products/useAddProduct";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import EditAddProductInputs, {
  EditAddProductInputsHandle,
} from "./EditAddProductInputs";

const Content = styled(Column)`
  & label {
    margin-bottom: -8px;
  }
`;

export const AddProductModal = () => {
  const { t } = useTranslation();

  const { JWT } = useJWT();
  const { mutate: addProduct } = useAddProduct();
  const { closeModal } = Modal.useModalContext();

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedDescription, setSelectedDescription] = useState<File[]>([]);
  const [selectedCover, setSelectedCover] = useState<File[]>([]);

  const editAddProductInputsRef = useRef<EditAddProductInputsHandle>(null);

  const handleSubmit = () => {
    const name = editAddProductInputsRef.current?.productRef.current?.value;
    const discount = Number(
      editAddProductInputsRef.current?.discountRef.current?.value
    );
    const price = Number(
      editAddProductInputsRef.current?.priceRef.current?.value
    );
    const shipping = Number(
      editAddProductInputsRef.current?.shippingRef.current?.value
    );

    if (
      !name ||
      !discount ||
      !price ||
      !shipping ||
      !selectedImages.length ||
      !selectedDescription.length ||
      !selectedCover.length
    ) {
      return toast.error("Please enter all fields.", {
        id: "add-product",
      });
    }

    addProduct({
      JWT,
      name: name,
      discount: discount,
      price: price,
      shipping: shipping,
      images: selectedImages,
      description: selectedDescription[0],
      coverImage: selectedCover[0],
    });

    closeModal();
  };

  return (
    <Modal.Window
      title="Add Product"
      buttons={[
        {
          key: "submit",
          text: t("submit"),
          color: "green",
          onClick: handleSubmit,
        },
      ]}
    >
      <Content $gap="1.2rem">
        <EditAddProductInputs
          ref={editAddProductInputsRef}
          selectedCover={selectedCover}
          setSelectedCover={setSelectedCover}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          setSelectedDescription={setSelectedDescription}
        />
      </Content>
    </Modal.Window>
  );
};
