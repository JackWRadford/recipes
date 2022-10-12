import { FC, MouseEventHandler } from "react";
import styles from "../../styles/Button.module.css";
import LoadingIndicator from "./LoadingIndicator";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  name: string;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  isLoading?: boolean;
  secondary?: boolean;
}

/**
 * Generic button to be used thoughout the app. Shows a loading indicator instead of the `label` if `isLoading` is true
 */
const Button: FC<ButtonProps> = ({
  type,
  name,
  label,
  onClick,
  className,
  isLoading = false,
  secondary = false,
}) => {
  return (
    <button
      className={`${styles.button} ${className} ${
        secondary ? styles.secondary : ""
      }`}
      type={type}
      name={name}
      onClick={onClick}
    >
      {!isLoading ? label : <LoadingIndicator />}
    </button>
  );
};

export default Button;
