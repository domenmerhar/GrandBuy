import { IconNav } from "../../Util/IconNav";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useDarkMode } from "../../contexts/DarkModeContext";

/**
 * ThemeButton komponenta za preklop med svetlo in temno temo.
 *
 * @function
 * @returns {JSX.Element} - JSX element gumba za preklop teme.
 *
 * @example
 * // Uporaba komponente
 * <ThemeButton />
 */

export const ThemeButton = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <IconNav onClick={toggleDarkMode}>
      {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </IconNav>
  );
};
