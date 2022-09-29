import { useRouter } from "next/router";
import Button from "../shared/Button";

const UserRecipesBtn = () => {
  const router = useRouter();

  return (
    <Button
      type={"button"}
      name={"yourrecipes"}
      label={"Your Recipes"}
      onClick={() => router.push("/published")}
    />
  );
};

export default UserRecipesBtn;
