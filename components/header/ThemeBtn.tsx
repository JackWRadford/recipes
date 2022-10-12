import { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeBtn = () => {
  const themeCtx = useContext(ThemeContext);

  const onClickHandler = () => {
    themeCtx.toggleDark();
  };

  return (
    <>
      {themeCtx.isDark ? (
        <FiSun onClick={onClickHandler} />
      ) : (
        <FaMoon onClick={onClickHandler} />
      )}
    </>
  );
};

export default ThemeBtn;
