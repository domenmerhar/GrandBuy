import { FC, useState } from "react";
import styled from "styled-components";
import { MarkdownRenderer } from "../../Components/Markdown/MarkdownRenderer";
import { Row } from "../../Util/Row";

const FilePickerContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  input[type="file"] {
    margin-top: 0.5rem;
  }
`;

const Input = styled.input`
  border: none;
  background: transparent;
`;

const Label = styled.label`
  margin-top: 5px;
`;

/**
 * Komponenta za nalaganje in prikazovanje Markdown datotek.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki omogoča nalaganje Markdown datotek in prikaz njihove vsebine.
 *
 * @example
 * // Uporaba komponente
 * <MarkdownFileUploader />
 */

export const MarkdownFileUploader: FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setMarkdownContent(String(reader.result));
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <FilePickerContainer>
        <Row $alignItems="center" $gap="4px">
          <Label htmlFor="markdown-file">Upload Markdown File:</Label>
          <Input
            type="file"
            id="markdown-file"
            accept=".md"
            onChange={handleFileUpload}
            as="input"
          />
        </Row>
      </FilePickerContainer>
      <MarkdownRenderer>{markdownContent}</MarkdownRenderer>
    </div>
  );
};
