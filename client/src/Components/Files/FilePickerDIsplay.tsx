import { FC, useEffect, useState } from "react";
import { FilePicker } from "./FilePicker";
import { fileToString } from "../../functions/fileToString";
import styled from "styled-components";

interface ImagePickerProps {
  label: string;
  id: string;
  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  multiple: boolean;
}

const Img = styled.img`
  width: 200px;
  object-fit: cover;
  margin: 5px;
`;

export const FilePickerDisplay: FC<ImagePickerProps> = ({
  label,
  id,
  selectedImages,
  setSelectedImages,
  multiple,
}) => {
  const [selectedImagesString, setSelectedImagesString] = useState<string[]>(
    []
  );

  useEffect(() => {
    const convertFiles = async () => {
      if (selectedImages.length === 0) return setSelectedImagesString([]);

      const result = await fileToString(selectedImages);
      setSelectedImagesString(result);
    };

    convertFiles();
  }, [selectedImages]);

  return (
    <>
      <FilePicker
        label={label}
        id={id}
        setSelectedFiles={setSelectedImages}
        multiple={multiple}
        accept="image/png, image/jpeg, .png, .jpg, .jpeg"
      />

      {selectedImages.length > 0 && (
        <div>
          {selectedImagesString.map((image, index) => (
            <Img key={index} src={image} alt={`Selected ${index}`} />
          ))}
        </div>
      )}
    </>
  );
};
