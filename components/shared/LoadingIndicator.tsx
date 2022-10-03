import styles from "../../styles/LoadingIndicator.module.css";

const LoadingIndicator = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.indicator} />
    </div>
  );
};

export default LoadingIndicator;
