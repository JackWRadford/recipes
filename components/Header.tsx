import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <h1>🥘 Recipes</h1>
        </div>
        <div className={styles.navContainer}>
          <h4>Login</h4>
          <h4>Sign up</h4>
        </div>
      </div>
    </div>
  );
};

export default Header;
