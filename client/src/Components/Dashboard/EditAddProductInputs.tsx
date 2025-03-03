import { InputWithLabel } from "../InputWithLabel";
import { FilePickerDisplay } from "../Files/FilePickerDIsplay";
import { FilePicker } from "../Files/FilePicker";
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useRef,
  ForwardedRef,
  useImperativeHandle,
} from "react";
import { useTranslation } from "react-i18next";

interface EditAddProductInputsProps {
  selectedCover: File[];
  setSelectedCover: Dispatch<SetStateAction<File[]>>;

  selectedImages: File[];
  setSelectedImages: Dispatch<SetStateAction<File[]>>;

  setSelectedDescription: Dispatch<SetStateAction<File[]>>;
}

export interface EditAddProductInputsHandle {
  productRef: React.RefObject<HTMLInputElement>;
  priceRef: React.RefObject<HTMLInputElement>;
  shippingRef: React.RefObject<HTMLInputElement>;
  discountRef: React.RefObject<HTMLInputElement>;
}

/**
 * EditAddProductInputs komponenta za urejanje in dodajanje vnosnih polj za izdelek.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {File[]} props.selectedCover - Izbrane naslovne slike izdelka.
 * @param {Dispatch<SetStateAction<File[]>>} props.setSelectedCover - Funkcija za nastavitev izbranih naslovnih slik.
 * @param {File[]} props.selectedImages - Izbrane slike izdelka.
 * @param {Dispatch<SetStateAction<File[]>>} props.setSelectedImages - Funkcija za nastavitev izbranih slik.
 * @param {Dispatch<SetStateAction<File[]>>} props.setSelectedDescription - Funkcija za nastavitev izbranega opisa izdelka.
 * @param {ForwardedRef<EditAddProductInputsHandle>} ref - Referenca za dostop do notranjih referenc vnosnih polj.
 * @returns {JSX.Element} - JSX element vnosnih polj za urejanje in dodajanje izdelka.
 *
 * @example
 * // Uporaba komponente
 * <EditAddProductInputs
 * selectedCover={selectedCoverFiles}
 * setSelectedCover={setSelectedCoverFiles}
 * selectedImages={selectedImagesFiles}
 * setSelectedImages={setSelectedImagesFiles}
 * setSelectedDescription={setSelectedDescriptionFiles}
 * ref={ref}
 * />
 */

const EditAddProductInputs = forwardRef(
  (
    {
      selectedCover,
      setSelectedCover,

      setSelectedDescription,

      selectedImages,
      setSelectedImages,
    }: EditAddProductInputsProps,
    ref: ForwardedRef<EditAddProductInputsHandle>
  ) => {
    const { t } = useTranslation();

    const productRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const shippingRef = useRef<HTMLInputElement>(null);
    const discountRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      productRef,
      priceRef,
      shippingRef,
      discountRef,
    }));

    return (
      <>
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
      </>
    );
  }
);

export default EditAddProductInputs;
