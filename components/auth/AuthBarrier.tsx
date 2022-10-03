import { FC } from "react";
import styles from "../../styles/AuthBarrier.module.css";

interface IAuthBarrier {
  label: string;
}

const AuthBarrier: FC<IAuthBarrier> = ({ label }) => {
  return (
    <div className={styles.wrapper}>
      <h4>{`Login or Sign up to ${label}`}</h4>
    </div>
  );
};

export default AuthBarrier;
