import styled from "styled-components";

interface StyledSidebarProps {
  $position: string;
}

export const StyledSidebar = styled.aside<StyledSidebarProps>`
  position: ${({ $position }: StyledSidebarProps) => $position};
  display: inline-block;
  min-width: 20rem;
  width: 32rem;
  height: 100vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 2.4rem 3.2rem;
`;
