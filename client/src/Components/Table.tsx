import { FC } from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  border-radius: 15px;
  overflow: hidden;
  border-collapse: collapse;
  text-align: center;

  & td {
    padding: 0.5rem;
  }

  & tr:last-child {
    border-bottom: none;
  }
`;

const Header = styled.tr`
  background: linear-gradient(45deg, var(--orange-6), var(--orange-5));
`;

const Tr = styled.tr`
  background-color: var(--gray-1);
  border-bottom: 1px solid var(--gray-4);
`;

const Th = styled.th`
  padding: 0.8rem 1.2rem;
  color: var(--gray-0);
  text-transform: uppercase;
`;

interface TableProps {
  headers: string[];
  children: React.ReactNode | React.ReactNode[];
}

/**
 * Table komponenta za prikaz tabele s podatki.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {string[]} props.headers - Niz naslovov stolpcev tabele.
 * @param {React.ReactNode | React.ReactNode[]} props.children - Vsebina vrstic tabele.
 * @returns {JSX.Element} - JSX element tabele.
 *
 * @example
 * // Uporaba komponente
 * <Table headers={["Ime", "Priimek", "Starost"]}>
 * <Table.Row>
 * <td>Janez</td>
 * <td>Novak</td>
 * <td>30</td>
 * </Table.Row>
 * <Table.Row>
 * <td>Ana</td>
 * <td>Kovač</td>
 * <td>25</td>
 * </Table.Row>
 * </Table>
 */

export const Table: FC<TableProps> & {
  Row: typeof Tr;
} = ({ headers, children }) => {
  return (
    <StyledTable>
      <thead>
        <Header>
          {headers.map((header) => (
            <Th key={header}>{header}</Th>
          ))}
        </Header>
      </thead>

      <tbody>{children}</tbody>
    </StyledTable>
  );
};

/**
 * Table.Row komponenta za prikaz vrstice v tabeli.
 *
 * @function
 * @returns {JSX.Element} - JSX element vrstice tabele.
 */

Table.Row = Tr;
