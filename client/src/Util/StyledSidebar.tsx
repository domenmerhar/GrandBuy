import styled from "styled-components";

interface StyledSidebarProps {
  $position: string;
  $rounded?: boolean;
  $width?: string;
  $height?: string;
}

export const StyledSidebar = styled.aside<StyledSidebarProps>`
  position: ${({ $position }) => $position};
  display: inline-block;
  width: ${({ $width }) => $width || "32rem"};
  height: ${({ $height }) => $height || "100vh"};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 2.4rem 3.2rem;

  ${({ $rounded }) => $rounded && "border-radius: 15px;"}
`;
