import { useState } from "react";
import Button from "../ui/Button";
import SignUpModal from "./AuthModal";

/**
 * Shows the authentication modal in sign up mode
 */
const LoginBtn = () => {
  let [showModalState, setModalState] = useState(false);

  const clickHandler = () => {
    setModalState(true);
  };

  const closeHander = () => {
    setModalState(false);
  };

  return (
    <>
      {showModalState && <SignUpModal isSignUp={false} onClose={closeHander} />}
      <Button
        type={"button"}
        name={"login"}
        label={"Login"}
        onClick={clickHandler}
      />
    </>
  );
};

export default LoginBtn;
