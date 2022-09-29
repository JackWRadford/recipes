import { useRouter } from "next/router";
import Button from "../shared/Button";

const UserSavedRecipesBtn = () => {
  const router = useRouter();

  return (
    <Button
      type={"button"}
      name={"savedrecipes"}
      label={"Favourites"}
      onClick={() => router.push("/favourites")}
    />
  );
};

export default UserSavedRecipesBtn;
