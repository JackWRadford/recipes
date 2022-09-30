import { useRouter } from "next/router";
import { FC } from "react";
import { FaThList } from "react-icons/fa";
import Button from "../shared/Button";

interface IUserRecipesBtnProps {
  isMobile: boolean;
}

const UserRecipesBtn: FC<IUserRecipesBtnProps> = ({ isMobile }) => {
  const router = useRouter();

  return isMobile ? (
    <FaThList onClick={() => router.push("/published")} />
  ) : (
    <Button
      type={"button"}
      name={"yourrecipes"}
      label={"Published"}
      onClick={() => router.push("/published")}
    />
  );
};

export default UserRecipesBtn;
