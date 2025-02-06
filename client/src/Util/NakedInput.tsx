import styled from "styled-components";

interface NakedInputProps {
  $width?: string;
  $height?: string;
  $fontSize?: string;
  $fontWeight?: string;
}

export const NakedInput = styled.input<NakedInputProps>`
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: textfield;

  border: none;
  border-radius: 8px;

  width: ${({ $width }) => $width || "4rem"};
  height: ${({ $height }) => $height || "4rem"};

  text-align: center;

  font-size: ${({ $fontSize }) => $fontSize || "2rem"};
  font-weight: ${({ $fontWeight }) => $fontWeight || "500"};

  body.dark-mode & {
    background-color: var(--gray-0);
    color: var(--gray-4);
  }
`;
