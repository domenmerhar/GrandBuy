import styled from "styled-components";
import { FC, ReactNode } from "react";

interface SidebarProps {
  children: ReactNode | ReactNode[];
}

const StyledSidebar = styled.aside`
  position: fixed;
  display: inline-block;
  min-width: 20rem;
  width: 32rem;
  height: 100vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 2.4rem 3.2rem;
`;

const Placeholder = styled.div`
  display: inline-block;
  min-width: 20rem;
  width: 32rem;
  height: 100vh;
`;

export const Sidebar: FC<SidebarProps> = ({ children }) => {
  return (
    <>
      <StyledSidebar>{children}</StyledSidebar>
      <Placeholder />
    </>
  );
};
