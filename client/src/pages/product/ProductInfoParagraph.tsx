import { FC } from "react";
import styled from "styled-components";

const Em = styled.em`
  font-style: normal;
  font-weight: 500;
`;

interface ProductInfoParagraphProps {
  title: string;
  value: string;
}

export const ProductInfoParagraph: FC<ProductInfoParagraphProps> = ({
  title,
  value,
}) => {
  return (
    <p>
      {title}: <Em>{value}</Em>
    </p>
  );
};
