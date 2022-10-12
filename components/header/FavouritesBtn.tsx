import { useRouter } from "next/router";
import { FC } from "react";
import Button from "../ui/Button";

/**
 * Navigates to the favourites page
 */
const FavouritesBtn = () => {
  const router = useRouter();

  const onClickHandler = () => {
    router.push("/favourites");
  };

  return (
    <Button
      secondary={true}
      type={"button"}
      name={"savedrecipes"}
      label={"Favourites"}
      onClick={onClickHandler}
    />
  );
};

export default FavouritesBtn;
