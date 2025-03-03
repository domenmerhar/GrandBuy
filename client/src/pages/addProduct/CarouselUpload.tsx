import styled from "styled-components";
import { FilePicker } from "../../Components/Files/FilePicker";
import { ImageCarousel } from "../product/ImageCarousel";
import { Column } from "../../Util/Column";
import { FC } from "react";

const ImagesColumn = styled(Column)`
  width: 100%;
`;

interface CarouselUploadProps {
  selectedImages: string[];
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 * Properties za komponento CarouselUpload.
 * @typedef {Object} CarouselUploadProps
 * @property {string[]} selectedImages - Seznam izbranih slik.
 * @property {React.Dispatch<React.SetStateAction<string[]>>} setSelectedImages - Funkcija za nastavljanje izbranih slik.
 */

/**
 * Komponenta za nalaganje slik in prikazovanje vrtiljaka slik.
 * @function
 * @param {CarouselUploadProps} props - Lastnosti komponente.
 * @returns {JSX.Element} JSX Element za nalaganje in prikazovanje slik.
 *
 * @example
 * // Uporaba komponente
 * <CarouselUpload selectedImages={[]} setSelectedImages={() => {}} />
 */
export const CarouselUpload: FC<CarouselUploadProps> = ({
  selectedImages,
  setSelectedImages,
}) => {
  return (
    <ImagesColumn $gap="1.2rem">
      <ImageCarousel images={selectedImages} />
      <FilePicker setSelectedFiles={setSelectedImages} multiple />
    </ImagesColumn>
  );
};
