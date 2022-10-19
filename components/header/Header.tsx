import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../styles/Header.module.css";
import ThemeBtn from "./ThemeBtn";
import { FiMenu, FiX } from "react-icons/fi";
import HeaderActions from "./HeaderActions";

/**
 * Application header
 */
const Header = () => {
  const { user } = useContext(AuthContext);
  // Depends on window width. Dictates if label of icons should be used for header actions
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 700);
    /**
     * Sets if mobile, depending on window width. Used on "resize" event
     */
    const updateMedia = () => {
      setIsMobile(window.innerWidth < 700);
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const onClickMenuBtn = () => {
    setShowMenu((lastValue) => !lastValue);
  };

  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Link href={"/"}>
            <div className={styles.logoContainer}>Recipes</div>
          </Link>
          <div className={styles.navContainer}>
            {isMobile ? (
              <>
                <ThemeBtn />
                {showMenu ? (
                  <FiX size={24} onClick={onClickMenuBtn} />
                ) : (
                  <FiMenu size={24} onClick={onClickMenuBtn} />
                )}
              </>
            ) : (
              <>
                <HeaderActions user={user} />
                <ThemeBtn />
              </>
            )}
          </div>
        </div>
      </div>
      {showMenu && (
        <div className={styles.headerMenu}>
          <HeaderActions user={user} />
        </div>
      )}
    </header>
  );
};

export default Header;
