import { useRouter } from "next/router";
import { FC } from "react";
import Button from "../ui/Button";

interface IFavouritesBtnProps {
  closeSidebar?: () => void;
}

/**
 * Navigates to the favourites page
 */
const FavouritesBtn: FC<IFavouritesBtnProps> = ({ closeSidebar }) => {
  const router = useRouter();

  const onClickHandler = () => {
    if (closeSidebar) closeSidebar();
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
