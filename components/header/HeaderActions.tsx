import { User } from "firebase/auth";
import { FC } from "react";
import LoginBtn from "../auth/LoginBtn";
import LogoutBtn from "../auth/LogoutBtn";
import SignUpBtn from "../auth/SignUpBtn";
import AddRecipeBtn from "./AddRecipeBtn";
import FavouritesBtn from "./FavouritesBtn";
import PublishedBtn from "./PublishedBtn";

interface IHeaderActions {
  user: User | null;
}

/**
 * Get the Header actions, depending if there is an authenticated `user` or not.
 */
const HeaderActions: FC<IHeaderActions> = ({ user }) => {
  return !user ? (
    <>
      <LoginBtn />
      <SignUpBtn />
    </>
  ) : (
    <>
      <FavouritesBtn />
      <PublishedBtn />
      <LogoutBtn />
      <AddRecipeBtn />
    </>
  );
};

export default HeaderActions;
