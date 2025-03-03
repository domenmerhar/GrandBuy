import styled from "styled-components";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../contexts/AuthContext";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import { IconNav } from "../../Util/IconNav";
import { ThemeButton } from "../Button/ThemeButton";

const ThemeExitHolder = styled.div`
  margin-top: auto;
  margin-bottom: 0.8rem;
  justify-self: flex-end;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

/**
 * BurgerMenuThemeExit komponenta za prikaz gumbov za temo in izhod v stranskem meniju.
 *
 * @component
 * @returns {JSX.Element} - JSX element gumbov za temo in izhod.
 *
 * @example
 * // Uporaba komponente
 * <BurgerMenuThemeExit />
 */

export const BurgerMenuThemeExit = () => {
  const { mutate } = useLogout();
  const { JWT } = useAuthContext();

  const handleExit = () => {
    mutate(JWT);
  };

  return (
    <ThemeExitHolder>
      <ThemeButton />

      <IconNav onClick={handleExit}>
        <HiArrowRightStartOnRectangle size={48} />
      </IconNav>
    </ThemeExitHolder>
  );
};
