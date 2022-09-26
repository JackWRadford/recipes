import React, { ChangeEvent, FC } from "react";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import styles from "../../styles/SignUpModal.module.css";

interface AuthModalProps {
  isSignUp: boolean;
  onClose: () => void;
}

/// For sign up and sign in
const AuthModal: FC<AuthModalProps> = ({ isSignUp, onClose }) => {
  /// Either create new user or login
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Modal
      title={isSignUp ? "Sign up" : "Log in"}
      onClose={onClose}
      content={
        <form onSubmit={submitHandler}>
          <div className={styles.contentWrapper}>
            <Input
              type={"email"}
              name={"email"}
              value={""}
              placeholder={"Email"}
              onChange={function (event: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.");
              }}
            />
            <Input
              type={"password"}
              name={"password"}
              value={""}
              placeholder={"Password"}
              onChange={function (event: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.");
              }}
            />
            {isSignUp && (
              <Input
                type={"password"}
                name={"confirmpassword"}
                value={""}
                placeholder={"Confirm password"}
                onChange={function (
                  event: ChangeEvent<HTMLInputElement>
                ): void {
                  throw new Error("Function not implemented.");
                }}
              />
            )}
            <Button
              type={"submit"}
              name={"signup"}
              label={isSignUp ? "Sign up" : "Log in"}
              onClick={undefined}
            />
          </div>
        </form>
      }
    />
  );
};

export default AuthModal;
