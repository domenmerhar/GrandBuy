import React, { FC } from "react";
import { Row } from "../../Util/Row";
import styled from "styled-components";

const Label = styled.label`
  margin-top: 2px;
`;

interface ImagePickerProps {
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  label: string;
  id: string;
  multiple?: boolean;
  accept?: string;
}

export const FilePicker: FC<ImagePickerProps> = ({
  setSelectedFiles,
  label,
  id,
  multiple = false,
  accept = "image/*",
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  return (
    <Row $gap="0.8rem">
      <Label htmlFor={id}>{label}</Label>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        multiple={multiple}
        id={id}
      />
    </Row>
  );
};
