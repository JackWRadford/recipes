import React, { ChangeEvent, FC, useState } from "react";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import styles from "../../styles/AuthModal.module.css";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import ErrorMsg from "../shared/ErrorMsg";
import { FirebaseError } from "firebase/app";
import { readableFromCode } from "../../helper/FirebaseErrors";

interface AuthModalProps {
  isSignUp: boolean;
  onClose: () => void;
}

/// For sign up and sign in
const AuthModal: FC<AuthModalProps> = ({ isSignUp, onClose }) => {
  /// Display name
  const [displayName, setDisplayName] = useState("");
  /// Email
  const [email, setEmail] = useState("");
  /// Password
  const [password, setPassword] = useState("");
  /// Confirm password
  const [confirmPassword, setConfirmPassword] = useState("");

  /// Error message
  const [errorMessage, setErrorMessage] = useState("");

  /// Loading
  const [isLoading, setIsLoading] = useState(false);

  /// Either create new user account or login
  const submitHandler = async (event: React.FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      if (isSignUp) {
        if (!displayName.trim()) {
          setIsLoading(false);
          setErrorMessage("Please enter a display name");
          return;
        }
        if (password === confirmPassword) {
          const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          await updateProfile(credential.user, { displayName: displayName });
          setIsLoading(false);
          onClose();
        } else {
          setIsLoading(false);
          setErrorMessage("Passwords must match");
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setIsLoading(false);
        onClose();
      }
    } catch (error) {
      setIsLoading(false);
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
