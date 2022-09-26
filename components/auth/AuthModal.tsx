import React, { ChangeEvent, FC, useState } from "react";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import styles from "../../styles/SignUpModal.module.css";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface AuthModalProps {
  isSignUp: boolean;
  onClose: () => void;
}

/// For sign up and sign in
const AuthModal: FC<AuthModalProps> = ({ isSignUp, onClose }) => {
  /// Email
  const [email, setEmail] = useState("");
  /// Password
  const [password, setPassword] = useState("");
  /// Confirm password
  const [confirmPassword, setConfirmPassword] = useState("");
  /// Error message
  const [errorMsg, setErrorMsg] = useState("");

  /// Either create new user account or login
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isSignUp) {
        if (password === confirmPassword) {
          await createUserWithEmailAndPassword(auth, email, password);
        } else {
        }
        onClose();
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
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
              value={email}
              placeholder={"Email"}
              onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                setEmail(event.currentTarget.value);
              }}
            />
            <Input
              type={"password"}
              name={"password"}
              value={password}
              placeholder={"Password"}
              onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                setPassword(event.currentTarget.value);
              }}
            />
            {isSignUp && (
              <Input
                type={"password"}
                name={"confirmpassword"}
                value={confirmPassword}
                placeholder={"Confirm password"}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                  setConfirmPassword(event.currentTarget.value);
                }}
              />
            )}
            <Button
              type={"submit"}
              name={"signup"}
              label={isSignUp ? "Sign up" : "Log in"}
              onClick={() => {}}
            />
          </div>
        </form>
      }
    />
  );
};

export default AuthModal;
