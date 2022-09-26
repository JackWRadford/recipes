import { FC, MouseEventHandler } from "react";
import styles from "../../styles/Button.module.css";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  name: string;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button: FC<ButtonProps> = ({ type, name, label, onClick, className }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      name={name}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
