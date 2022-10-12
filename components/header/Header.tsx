import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../styles/Header.module.css";
import LoginBtn from "../auth/LoginBtn";
import LogoutBtn from "../auth/LogoutBtn";
import SignUpBtn from "../auth/SignUpBtn";
import AddRecipeBtn from "./AddRecipeBtn";
import PublishedBtn from "./PublishedBtn";
import FavouritesBtn from "./FavouritesBtn";
import ThemeBtn from "./ThemeBtn";
import MenuBtn from "./MenuBtn";

/**
 * Application header
 */
const Header = () => {
  const { user } = useContext(AuthContext);
  // Depends on window width. Dictates if label of icons should be used for header actions
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Link href={"/"}>
          <div className={styles.logoContainer}>
            <h1>🧑‍🍳Recipes</h1>
          </div>
        </Link>
        <div className={styles.navContainer}>
          {isMobile ? (
            <MenuBtn />
          ) : !user ? (
            <>
              <LoginBtn />
              <SignUpBtn />
              <ThemeBtn />
            </>
          ) : (
            <>
              <FavouritesBtn />
              <PublishedBtn />
              <LogoutBtn />
              <AddRecipeBtn />
              <ThemeBtn />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
