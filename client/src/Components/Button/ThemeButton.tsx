import { IconNav } from "../../Util/IconNav";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useDarkMode } from "../../contexts/DarkModeContext";

export const ThemeButton = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <IconNav onClick={toggleDarkMode}>
      {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </IconNav>
  );
};
