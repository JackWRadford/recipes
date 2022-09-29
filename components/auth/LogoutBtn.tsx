import { signOut } from "firebase/auth";
import { FC } from "react";
import { FiLogOut } from "react-icons/fi";
import { auth } from "../../firebaseConfig";
import Button from "../shared/Button";

interface ILogoutBtnProps {
  isMobile: boolean;
}

const LogoutBtn: FC<ILogoutBtnProps> = ({ isMobile }) => {
  /// Sign out current user
  const clickHandler = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return isMobile ? (
    <FiLogOut onClick={clickHandler} />
  ) : (
    <Button
      type={"button"}
      name={"logout"}
      label={"Logout"}
      onClick={clickHandler}
    />
  );
};

export default LogoutBtn;
