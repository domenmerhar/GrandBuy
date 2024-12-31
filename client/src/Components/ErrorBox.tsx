import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import styled from "styled-components";
import { Column } from "../Util/Column";
import { HeaderUppercaseBold } from "../Util/HeaderUppercaseBold";

const StyledErrorBox = styled.div`
  height: 80dvh;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;

  & svg {
    width: 6.4rem;
    height: 6.4rem;
  }
`;

export const ErrorBox = () => {
  return (
    <StyledErrorBox>
      <HiOutlineExclamationTriangle />

      <Column $gap="8px">
        <HeaderUppercaseBold>Something went wrong</HeaderUppercaseBold>
        <p>Please try again later.</p>
      </Column>
    </StyledErrorBox>
  );
};
