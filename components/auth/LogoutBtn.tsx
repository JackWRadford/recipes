import { FC } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { logout } from "../../services/auth_service";
import Button from "../ui/Button";

interface ILogoutBtnProps {
  isMobile: boolean;
}

/**
 * Logout the current user. Displays an icon instead of a label if `isMobile` is true
 */
const LogoutBtn: FC<ILogoutBtnProps> = ({ isMobile }) => {
  /**
   * Sign out current user
   */
  const clickHandler = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return isMobile ? (
    <FaSignOutAlt onClick={clickHandler} />
  ) : (
    <Button
      secondary={true}
      type={"button"}
      name={"logout"}
      label={"Logout"}
      onClick={clickHandler}
    />
  );
};

export default LogoutBtn;
