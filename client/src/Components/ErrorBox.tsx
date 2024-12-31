import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import styled from "styled-components";
import { Column } from "../Util/Column";
import { HeaderUppercaseBold } from "../Util/HeaderUppercaseBold";
import { FC } from "react";

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

export const ErrorBox: FC<ErrorBoxProps> = ({ fullPage = true }) => {
  return (
    <StyledErrorBox $fullPage={fullPage}>
      <HiOutlineExclamationTriangle />

      <Column $gap="8px">
        <HeaderUppercaseBold>Something went wrong</HeaderUppercaseBold>
        <p>Please try again later.</p>
      </Column>
    </StyledErrorBox>
  );
};
