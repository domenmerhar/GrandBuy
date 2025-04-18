import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import styled from "styled-components";
import { Column } from "../Util/Column";
import { HeaderUppercaseBold } from "../Util/HeaderUppercaseBold";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface StyledErrorBoxProps {
  $fullPage?: boolean;
}

const StyledErrorBox = styled.div<StyledErrorBoxProps>`
  height: ${({ $fullPage }) => ($fullPage ? "80dvh" : "100%")};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;

  & svg {
    width: 6.4rem;
    height: 6.4rem;
  }
`;

interface ErrorBoxProps {
  fullPage?: boolean;
}

/**
 * ErrorBox komponenta za prikaz sporočila o napaki.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {boolean} [props.fullPage=true] - Ali naj se napaka prikaže na celotni strani.
 * @returns {JSX.Element} - JSX element sporočila o napaki.
 *
 * @example
 * // Uporaba komponente
 * <ErrorBox fullPage={false} />
 */

export const ErrorBox: FC<ErrorBoxProps> = ({ fullPage = true }) => {
  const { t } = useTranslation();

  return (
    <StyledErrorBox $fullPage={fullPage}>
      <HiOutlineExclamationTriangle />

      <Column $gap="8px">
        <HeaderUppercaseBold>{t("somethingWentWrong")}</HeaderUppercaseBold>
        <p>{t("pleaseTryAgainLater")}</p>
      </Column>
    </StyledErrorBox>
  );
};
