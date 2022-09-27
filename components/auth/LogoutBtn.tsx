import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Button from "../shared/Button";

const LogoutBtn = () => {
  /// Sign out current user
  const clickHandler = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        type={"button"}
        name={"logout"}
        label={"Logout"}
        onClick={clickHandler}
      />
    </>
  );
};

export default LogoutBtn;
