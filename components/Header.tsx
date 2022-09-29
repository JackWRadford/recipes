import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/Header.module.css";
import LoginBtn from "./auth/LoginBtn";
import LogoutBtn from "./auth/LogoutBtn";
import SignUpBtn from "./auth/SignUpBtn";
import AddRecipeBtn from "./user/addRecipeBtn";
import UserRecipesBtn from "./user/userRecipesBtn";
import UserSavedRecipesBtn from "./user/userSavedRecipesBtn";

const Header = () => {
  const userCtx = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 700);

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
            <h1>🍔{!isMobile && " Recipes"}</h1>
          </div>
        </Link>
        <div className={styles.navContainer}>
          {!userCtx ? (
            <>
              <LoginBtn />
              <SignUpBtn />
            </>
          ) : (
            <>
              <UserSavedRecipesBtn isMobile={isMobile} />
              <UserRecipesBtn isMobile={isMobile} />
              <LogoutBtn isMobile={isMobile} />
              <AddRecipeBtn />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
