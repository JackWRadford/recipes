import Link from "next/link";
import styles from "../styles/Header.module.css";
import LoginBtn from "./auth/LoginBtn";
import SignUpBtn from "./auth/SignUpBtn";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Link href={"/"}>
          <div className={styles.logoContainer}>
            <h1>🍔 Recipes</h1>
          </div>
        </Link>
        <div className={styles.navContainer}>
          <LoginBtn />
          <SignUpBtn />
        </div>
      </div>
    </div>
  );
};

export default Header;
