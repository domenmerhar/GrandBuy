import { FC } from "react";
import styled from "styled-components";

const StyledCardWithHeader = styled.div`
  width: 80vw;
  max-width: 86rem;
  background-color: var(--gray-2);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  background: linear-gradient(45deg, var(--orange-5), var(--orange-6));
  padding: 1.6rem 2.4rem;
  width: 100%;
  font-size: 2.4rem;
  text-transform: uppercase;
  color: var(--gray-1);
`;

const CardBody = styled.div`
  padding: 3.2rem 4.8rem;
`;

interface ChildrenProps {
  children: React.ReactNode[] | React.ReactNode;
}

/**
 * CardWithHeader komponenta za prikaz kartice z glavo in telesom.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {React.ReactNode[] | React.ReactNode} props.children - Vsebina kartice.
 * @returns {JSX.Element} - JSX element kartice z glavo.
 *
 * @example
 * // Uporaba komponente
 * <CardWithHeader>
 * <CardWithHeader.Header>Naslov kartice</CardWithHeader.Header>
 * <CardWithHeader.Body>Vsebina kartice</CardWithHeader.Body>
 * </CardWithHeader>
 */

export const CardWithHeader: FC<ChildrenProps> & {
  Header: FC<ChildrenProps>;
  Body: FC<ChildrenProps>;
} = ({ children }) => {
  return <StyledCardWithHeader>{children}</StyledCardWithHeader>;
};

/**
 * CardWithHeader.Header komponenta za prikaz glave kartice.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {React.ReactNode[] | React.ReactNode} props.children - Vsebina glave kartice.
 * @returns {JSX.Element} - JSX element glave kartice.
 */

CardWithHeader.Header = ({ children }: ChildrenProps) => {
  return <CardHeader>{children}</CardHeader>;
};

/**
 * CardWithHeader.Body komponenta za prikaz telesa kartice.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {React.ReactNode[] | React.ReactNode} props.children - Vsebina telesa kartice.
 * @returns {JSX.Element} - JSX element telesa kartice.
 */

CardWithHeader.Body = ({ children }: ChildrenProps) => {
  return <CardBody>{children}</CardBody>;
};
