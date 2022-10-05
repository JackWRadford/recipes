import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from "react";
import styles from "../../styles/Input.module.css";

interface InputProps {
  type: HTMLInputTypeAttribute;
  name: string;
  value: string | number;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

/**
 * Generic input to be used throughout the app.
 */
const Input: FC<InputProps> = ({
  type,
  name,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
