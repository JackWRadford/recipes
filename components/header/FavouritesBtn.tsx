import { useRouter } from "next/router";
import { FC } from "react";
import { FaBookmark } from "react-icons/fa";
import Button from "../ui/Button";

interface IFavouritesBtnProps {
  isMobile: boolean;
}

/**
 * Navigates to the favourites page
 */
const FavouritesBtn: FC<IFavouritesBtnProps> = ({ isMobile }) => {
  const router = useRouter();

  return isMobile ? (
    <FaBookmark onClick={() => router.push("/favourites")} />
  ) : (
    <Button
      secondary={true}
      type={"button"}
      name={"savedrecipes"}
      label={"Favourites"}
      onClick={() => router.push("/favourites")}
    />
  );
};

export default FavouritesBtn;
