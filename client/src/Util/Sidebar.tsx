import styled from "styled-components";
import { FC, ReactNode } from "react";
import { StyledSidebar } from "./StyledSidebar";

interface SidebarProps {
  children: ReactNode | ReactNode[];
}

const Placeholder = styled.div`
  display: inline-block;
  min-width: 20rem;
  width: 32rem;
  height: 100vh;
`;

export const Sidebar: FC<SidebarProps> = ({ children }) => {
  return (
    <>
      <StyledSidebar $position="fixed">{children}</StyledSidebar>
      <Placeholder />
    </>
  );
};
