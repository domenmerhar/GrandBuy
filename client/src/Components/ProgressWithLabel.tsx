import styled from "styled-components";
import { Row } from "../Util/Row";
import { FC } from "react";

const Progress = styled.progress`
  height: 2.4rem;
  appearance: none;
  border-radius: 8px;

  transition: all 200ms;

  &::-webkit-progress-bar {
    background-color: var(--gray-1);
    overflow: hidden;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &::-webkit-progress-value {
    background-color: var(--orange-6);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &::-moz-progress-bar {
    background-color: var(--orange-6);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`;

const Label = styled.label`
  min-width: 100px;
  font-size: 1.4rem;
  font-weight: 500;
`;

interface PogressWithLabelProps {
  value: number;
  max: number;
  children: string;
}

/**
 * ProgressWithLabel komponenta za prikaz vrstice napredka z oznako.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {number} props.value - Trenutna vrednost napredka.
 * @param {number} props.max - Največja vrednost napredka.
 * @param {string} props.children - Besedilo oznake.
 * @returns {JSX.Element} - JSX element vrstice napredka z oznako.
 *
 * @example
 * // Uporaba komponente
 * <ProgressWithLabel value={50} max={100} children="Napredek: 50%" />
 */

export const ProgressWithLabel: FC<PogressWithLabelProps> = ({
  value,
  max,
  children,
}) => {
  return (
    <Row $gap="1.6rem">
      <Progress value={value} max={max} id="test">
        10
      </Progress>
      <Label htmlFor="test">{children}</Label>
    </Row>
  );
};
