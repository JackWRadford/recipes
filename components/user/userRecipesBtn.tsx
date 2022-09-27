import { useContext } from "react";
import { Lists, ListsContext } from "../../context/ListsContext";
import Button from "../shared/Button";

const UserRecipesBtn = () => {
  const listsCtx = useContext(ListsContext);

  const clickHandler = () => {
    listsCtx.onChangeList(Lists.users);
  };

  return (
    <Button
      type={"button"}
      name={"yourrecipes"}
      label={"Your Recipes"}
      onClick={clickHandler}
    />
  );
};

export default UserRecipesBtn;
