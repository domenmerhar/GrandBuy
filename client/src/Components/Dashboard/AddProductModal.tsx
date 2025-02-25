import styled from "styled-components";
import { Column } from "../../Util/Column";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { Modal } from "../../Util/Modal";
import { useRef, useState } from "react";
import { FilePicker } from "../Files/FilePicker";
import { useJWT } from "../../hooks/useJWT";
import { useAddProduct } from "../../hooks/products/useAddProduct";
import { FilePickerDisplay } from "../Files/FilePickerDIsplay";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

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

  const productRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const shippingRef = useRef<HTMLInputElement>(null);
  const discountRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const name = productRef.current?.value;
    const discount = Number(discountRef.current?.value);
    const price = Number(priceRef.current?.value);
    const shipping = Number(shippingRef.current?.value);

    if (
      !name ||
      !discount ||
      !price ||
      !shipping ||
      !selectedImages.length ||
      !selectedDescription.length ||
      !selectedCover.length
    )
      return toast.error("Please enter all fields.", { id: "add-product" });

    addProduct({
      JWT,
      name: productRef.current?.value,
      discount: Number(discountRef.current?.value),
      price: Number(priceRef.current?.value),
      shipping: Number(shippingRef.current?.value),
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
      <Content $gap="1.2rem" as="form" onSubmit={handleSubmit}>
        <InputWithLabel
          id="product-name"
          placeholder="radio"
          title={t("productName")}
          type="text"
          ref={productRef}
        />

        <InputWithLabel
          id="price"
          placeholder="10.99"
          title={t("price")}
          type="number"
          ref={priceRef}
        />

        <InputWithLabel
          id="shipping"
          placeholder="2.99"
          title={t("shipping")}
          type="number"
          ref={shippingRef}
        />

        <InputWithLabel
          id="discount"
          placeholder="0"
          title={t("discount")}
          type="number"
          ref={discountRef}
        />

        <FilePickerDisplay
          label={t("productCover")}
          id="product-cover"
          selectedImages={selectedCover}
          setSelectedImages={setSelectedCover}
          multiple={false}
        />

        <FilePickerDisplay
          label={t("productImages")}
          id="product-images"
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          multiple
        />

        <FilePicker
          label={t("productDescriptionMd")}
          id="product-description"
          accept=".md, text/markdown"
          setSelectedFiles={setSelectedDescription}
        />
      </Content>
    </Modal.Window>
  );
};
