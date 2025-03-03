import { FC } from "react";
import styled from "styled-components";
import { Spinner } from "../Util/Spinner";

interface SpinnerInBoxProps {
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  fullPage?: boolean;
}

interface SpinnerProps {
  $fullPage?: boolean;
}

const StyledSpinnerInBox = styled.div<SpinnerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $fullPage }) => ($fullPage ? "80dvh" : "100%")};
`;

/**
 * SpinnerInBox komponenta za prikaz vrtljivega indikatorja nalaganja znotraj polja.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {"small" | "medium" | "large"} [props.size="large"] - Velikost vrtljivega indikatorja.
 * @param {boolean} [props.isLoading=true] - Ali se podatki nalagajo.
 * @param {boolean} [props.fullPage=true] - Ali naj se vrtljivi indikator prikaže na celotni strani.
 * @returns {JSX.Element | null} - JSX element vrtljivega indikatorja ali null, če se podatki ne nalagajo.
 *
 * @example
 * // Uporaba komponente
 * <SpinnerInBox size="medium" isLoading={true} fullPage={false} />
 */

export const SpinnerInBox: FC<SpinnerInBoxProps> = ({
  size = "large",
  isLoading = true,
  fullPage = true,
}) => {
  if (!isLoading) return null;

  return (
    <StyledSpinnerInBox $fullPage={fullPage}>
      <Spinner $size={size} />
    </StyledSpinnerInBox>
  );
};
