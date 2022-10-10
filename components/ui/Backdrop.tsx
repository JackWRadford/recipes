import styles from "../../styles/Backdrop.module.css";

/**
 * Covers the whole window. Calls `onClick` when clicked.
 */
const Backdrop: React.FC<{ onClick: () => void }> = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick} />;
};

export default Backdrop;
