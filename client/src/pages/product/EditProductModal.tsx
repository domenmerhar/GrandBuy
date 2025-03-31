import { useRef, useState } from "react";
import EditAddProductInputs, {
  EditAddProductInputsHandle,
} from "../../Components/Dashboard/EditAddProductInputs";
import { Modal } from "../../Components/Modal";
import { useJWT } from "../../hooks/useJWT";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useEditProduct } from "../../hooks/products/useEditProduct";
import { useParams } from "react-router-dom";

/**
 * Komponenta za urejanje izdelka v modalnem oknu.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja modalno okno za urejanje izdelka.
 *
 * @example
 * // Uporaba komponente
 * <EditProductModal />
 */

export default function EditProductModal() {
  const { t } = useTranslation();

  const { JWT } = useJWT();
  const { mutate: editProduct } = useEditProduct();

  const { productId } = useParams();

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedDescription, setSelectedDescription] = useState<File[]>([]);
  const [selectedCover, setSelectedCover] = useState<File[]>([]);

  const editAddProductInputsRef = useRef<EditAddProductInputsHandle>(null);

  const handleSubmit = () => {
    const discount =
      editAddProductInputsRef?.current?.discountRef.current?.value;

    const price = editAddProductInputsRef?.current?.priceRef.current?.value;

    const productName =
      editAddProductInputsRef?.current?.productRef.current?.value;

    const shipping =
      editAddProductInputsRef?.current?.shippingRef.current?.value;

    if (
      !selectedImages.length &&
      !selectedDescription.length &&
      !selectedCover.length &&
      (Number(discount) < 0 || Number(discount) > 100) &&
      !price &&
      !productName &&
      !shipping
    )
      return toast.error(t("pleaseFillInAtLeastOneField"), {
        id: "edit-product",
      });

    console.log("editProduct", editProduct);

    editProduct({
      JWT,
      productId: productId!,
      coverImage: selectedCover[0],
      images: selectedImages,
      description: selectedDescription[0],
      discount: Number(discount),
      name: productName,
      price: Number(price),
      shipping: Number(shipping),
    });
  };

  return (
    <Modal.Window
      title={t("edit")}
      buttons={[
        {
          color: "red",
          key: "cancel",
          text: t("cancel"),
          onClick: () => null,
        },
        {
          key: "submit",
          color: "green",
          text: t("submit"),
          onClick: handleSubmit,
        },
      ]}
    >
      <EditAddProductInputs
        ref={editAddProductInputsRef}
        selectedCover={selectedCover}
        setSelectedCover={setSelectedCover}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        setSelectedDescription={setSelectedDescription}
      />
    </Modal.Window>
  );
}
