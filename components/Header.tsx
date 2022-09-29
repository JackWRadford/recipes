import Link from "next/link";
import { useContext } from "react";
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Link href={"/"}>
          <div className={styles.logoContainer}>
            <h1>🍔 Recipes</h1>
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
              <UserSavedRecipesBtn />
              <UserRecipesBtn />
              <LogoutBtn />
              <AddRecipeBtn />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
