import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import styled from "styled-components";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../contexts/AuthContext";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import { useDarkMode } from "../../contexts/DarkModeContext";

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

  & svg {
    width: 4.8rem;
    height: 4.8rem;
  }

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
  const { mutate } = useLogout();
  const { JWT } = useAuthContext();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleExit = () => {
    mutate(JWT);
  };

  return (
    <ThemeExitHolder>
      <IconNav onClick={toggleDarkMode}>
        {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
      </IconNav>

      <IconNav $iconColoring="fill" onClick={handleExit}>
        <HiArrowRightStartOnRectangle size={48} />
      </IconNav>
    </ThemeExitHolder>
  );
};
