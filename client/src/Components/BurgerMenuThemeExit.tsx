import { BiExit } from "react-icons/bi";
import { HiOutlineMoon } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ThemeExitHolder = styled.div`
  margin-top: auto;
  margin-bottom: 0.8rem;
  justify-self: flex-end;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

interface IconNavProps {
  $iconColoring?: "fill" | "stroke";
}

const IconNav = styled.button<IconNavProps>`
  background-color: transparent;
  border: none;
  transition: all 200ms;

  &:hover * {
    transform: scale(1.05);

    ${({ $iconColoring }) =>
      $iconColoring === "fill"
        ? "fill: var(--gray-0);"
        : "stroke: var(--gray-0);"};
  }

  &:active {
    transform: scale(0.95);
  }

  & * {
    ${({ $iconColoring }) =>
      $iconColoring === "fill"
        ? "fill: var(--gray-2);"
        : "stroke: var(--gray-2);"};

    transition: all 200ms;
  }
`;

export const BurgerMenuThemeExit = () => {
  const navigate = useNavigate();
  const handleThemeChange = () => {};

  const handleExit = () => {
    navigate("/login");
  };

  return (
    <ThemeExitHolder>
      <IconNav onClick={handleThemeChange}>
        <HiOutlineMoon size={48} />
      </IconNav>

      <IconNav $iconColoring="fill" onClick={handleExit}>
        <BiExit size={48} />
      </IconNav>
    </ThemeExitHolder>
  );
};
