import styled from "styled-components";
import { FilePicker } from "../../Components/FilePicker";
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
