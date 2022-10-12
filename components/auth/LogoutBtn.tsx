import { logout } from "../../services/auth_service";
import Button from "../ui/Button";

/**
 * Logout the current user. Displays an icon instead of a label if `isMobile` is true
 */
const LogoutBtn = () => {
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

  return (
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
