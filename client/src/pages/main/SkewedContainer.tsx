import React, { FC } from "react";
import styled from "styled-components";

interface SkewedContainerProps {
  children: React.ReactNode | React.ReactNode[];
}

const StyledSkewedContainer = styled.div`
  background-color: var(--gray-2);
  transform: skewY(var(--skew)) translateZ(0);
  margin-top: -10rem;
`;

const Content = styled.div`
  max-width: 1440px;
  padding: 6.4rem 3.2rem;
  margin: 0 auto;
  padding-top: 4.8rem;

  transform: skewY(var(--skew-negative)) translateZ(0);
`;

/**
 * Komponenta za prikaz vsebine z nagibom.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {ReactNode | ReactNode[]} props.children - Otroški elementi.
 * @returns {JSX.Element} JSX element, ki predstavlja vsebino z nagibom.
 */

export const SkewedContainer: FC<SkewedContainerProps> = ({ children }) => {
  return (
    <StyledSkewedContainer>
      <Content>{children}</Content>
    </StyledSkewedContainer>
  );
};
