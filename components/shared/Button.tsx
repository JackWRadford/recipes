import { FC, MouseEventHandler } from "react";
import styles from "../../styles/Button.module.css";
import LoadingIndicator from "./LoadingIndicator";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  name: string;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  type,
  name,
  label,
  onClick,
  className,
  isLoading = false,
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      name={name}
      onClick={onClick}
    >
      {!isLoading ? label : <LoadingIndicator />}
    </button>
  );
};

export default Button;
