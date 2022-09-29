import { useRouter } from "next/router";
import { FC } from "react";
import { FiList } from "react-icons/fi";
import Button from "../shared/Button";

interface IUserRecipesBtnProps {
  isMobile: boolean;
}

const UserRecipesBtn: FC<IUserRecipesBtnProps> = ({ isMobile }) => {
  const router = useRouter();

  return isMobile ? (
    <FiList onClick={() => router.push("/published")} />
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
