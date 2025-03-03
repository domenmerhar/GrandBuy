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

/**
 * FilePicker komponenta za izbiro datotek.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {React.Dispatch<React.SetStateAction<File[]>>} props.setSelectedFiles - Funkcija za nastavitev izbranih datotek.
 * @param {string} props.label - Oznaka vnosnega polja.
 * @param {string} props.id - ID vnosnega polja.
 * @param {boolean} [props.multiple=false] - Ali je dovoljena izbira več datotek.
 * @param {string} [props.accept="image/*"] - Sprejeti tipi datotek.
 * @returns {JSX.Element} - JSX element vnosnega polja za izbiro datotek.
 *
 * @example
 * // Uporaba komponente
 * <FilePicker
 * setSelectedFiles={setSelectedFiles}
 * label="Izberi slike"
 * id="imageUpload"
 * multiple={true}
 * accept="image/*, .pdf"
 * />
 */

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
