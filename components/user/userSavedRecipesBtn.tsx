import { useRouter } from "next/router";
import { FC } from "react";
import { FaBookmark } from "react-icons/fa";
import Button from "../shared/Button";

interface IUserSaveRecipesBtnProps {
  isMobile: boolean;
}

const UserSavedRecipesBtn: FC<IUserSaveRecipesBtnProps> = ({ isMobile }) => {
  const router = useRouter();

  return isMobile ? (
    <FaBookmark onClick={() => router.push("/favourites")} />
  ) : (
    <Button
      type={"button"}
      name={"savedrecipes"}
      label={"Favourites"}
      onClick={() => router.push("/favourites")}
    />
  );
};

export default UserSavedRecipesBtn;
