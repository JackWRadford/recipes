import React, { ChangeEvent, FC, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import styles from "../../styles/AuthModal.module.css";
import ErrorMsg from "../ui/ErrorMsg";
import { FirebaseError } from "firebase/app";
import { readableFromCode } from "../../helper/firebase_errors";
import { login, signUp } from "../../services/auth_service";

interface AuthModalProps {
  isSignUp: boolean;
  onClose: () => void;
}

/**
 * Shows form for signUp or login depending on `isSignUp` value.
 */
const AuthModal: FC<AuthModalProps> = ({ isSignUp, onClose }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Either signUp or login user with email and password, depending on the AuthModal's isSignUp parameter.
   *
   * @param event - React form event
   */
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (isSignUp) {
        if (!displayName.trim()) {
          setIsLoading(false);
          setErrorMessage("Please enter a display name");
          return;
        }
        if (password === confirmPassword) {
          await signUp(email, password, displayName);
          onClose();
        } else {
          setErrorMessage("Passwords must match");
        }
      } else {
        await login(email, password);
        onClose();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(readableFromCode(error.code));
      }
    }
    setIsLoading(false);
  };

  return (
    <Modal
      title={isSignUp ? "Sign up" : "Log in"}
      onClose={onClose}
      content={
        <form onSubmit={submitHandler}>
          <div className={styles.contentWrapper}>
            {isSignUp && (
              <Input
                type={"text"}
                name={"displayname"}
                value={displayName}
                placeholder={"Display name"}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                  setDisplayName(event.currentTarget.value);
                }}
              />
            )}
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
            {errorMessage && <ErrorMsg message={errorMessage} />}
            <Button
              type={"submit"}
              name={"signup"}
              label={isSignUp ? "Sign up" : "Log in"}
              onClick={() => {}}
              isLoading={isLoading}
            />
          </div>
        </form>
      }
    />
  );
};

export default AuthModal;
