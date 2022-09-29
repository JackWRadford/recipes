import styles from "../../styles/AuthBarrier.module.css";
import LoginBtn from "./LoginBtn";
import SignUpBtn from "./SignUpBtn";

const AuthBarrier = () => {
  return (
    <div className={styles.wrapper}>
      <h4>Login or Sign up to create a recipe</h4>
    </div>
  );
};

export default AuthBarrier;
