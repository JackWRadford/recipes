import { useContext } from "react";
import { Lists, ListsContext } from "../../context/ListsContext";
import Button from "../shared/Button";

const UserSavedRecipesBtn = () => {
  const listsCtx = useContext(ListsContext);

  const clickHandler = () => {
    listsCtx.onChangeList(Lists.saved);
  };

  return (
    <Button
      type={"button"}
      name={"savedrecipes"}
      label={"Favourites"}
      onClick={clickHandler}
    />
  );
};

export default UserSavedRecipesBtn;
