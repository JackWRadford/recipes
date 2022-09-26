import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/Header.module.css";
import LoginBtn from "./auth/LoginBtn";
import LogoutBtn from "./auth/LogoutBtn";
import SignUpBtn from "./auth/SignUpBtn";

const Header = () => {
  const user = useContext(AuthContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Link href={"/"}>
          <div className={styles.logoContainer}>
            <h1>🍔 Recipes</h1>
          </div>
        </Link>
        <div className={styles.navContainer}>
          {!user ? (
            <>
              <LoginBtn />
              <SignUpBtn />
            </>
          ) : (
            <LogoutBtn />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
