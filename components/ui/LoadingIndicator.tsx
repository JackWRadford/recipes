import styles from "../../styles/LoadingIndicator.module.css";

/**
 * Loading indicator to be used throughout the app.
 */
const LoadingIndicator = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.indicator} />
    </div>
  );
};

export default LoadingIndicator;
