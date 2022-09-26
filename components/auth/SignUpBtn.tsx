import { useState } from "react";
import Button from "../shared/Button";
import SignUpModal from "./AuthModal";

const SignUpBtn = () => {
  let [showModalState, setModalState] = useState(false);

  const clickHandler = () => {
    setModalState(true);
  };

  const closeHander = () => {
    setModalState(false);
  };

  return (
    <>
      {showModalState && <SignUpModal isSignUp={true} onClose={closeHander} />}
      <Button
        type={"button"}
        name={"signup"}
        label={"Sign up"}
        onClick={clickHandler}
      />
    </>
  );
};

export default SignUpBtn;
