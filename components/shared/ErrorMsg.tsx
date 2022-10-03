import { FC } from "react";
import styles from "../../styles/ErrorMsg.module.css";

interface ErrorMsgProps {
  message: string;
}

const ErrorMsg: FC<ErrorMsgProps> = ({ message }) => {
  return (
    <div className={styles.wrapper}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMsg;
