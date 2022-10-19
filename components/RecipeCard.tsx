import styles from "../styles/RecipeCard.module.css";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import Link from "next/link";
import { Recipe } from "../models/recipe";
import React, { FC, useContext, useState } from "react";
import { secondsToHoursMinutes } from "../helper/conversion_helpers";
import { AuthContext } from "../context/AuthContext";
import Modal from "./ui/Modal";
import { updateUserFavourites } from "../services/db_service";

interface IRecipeCardProps {
  recipe: Recipe;
}

/**
 * Shows the main `recipe` details. Can be clicked to navigate to the recipe page. Contains a bookmark button to favourite the recipe.
 */
const RecipeCard: FC<IRecipeCardProps> = ({ recipe }) => {
  const { user, favs, setFavs } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  /**
   * Toggles the recipe as a favourite if the user is authenticated, and asks the user to authenticate if they are not.
   *
   * @param e - Mouse event
   */
  const onFavouriteHandler = async (e: React.MouseEvent) => {
    // Stop the card from being clicked as well
    e.stopPropagation();
    if (!user) {
      // Alert user to authenticate to favourite recipes
      setShowModal(true);
      return;
    }
    // Add the recipe if not already a favourite, else remove it from favourites
    const index = favs.indexOf(recipe.id!, 0);
    const newFavs = [...favs];
    if (index > -1) {
      newFavs.splice(index, 1);
    } else {
      newFavs.push(recipe.id!);
    }
    try {
      // Update database
      await updateUserFavourites(user!.uid, newFavs);
      // Update locally
      setFavs(newFavs);
    } catch (error) {
      console.log("Error while updating favourites list.");
    }
  };

  return (
    <>
      {showModal && (
        <Modal
          title={"Login or sign up"}
          content={
            <p>You need to login or create an account to favourite recipes.</p>
          }
          onClose={onClose}
        />
      )}
      <Link href={`/recipe/${recipe.id}`}>
        <div className={styles.wrapper}>
          <div className={styles.contentContainer}>
            <div className={styles.detailsContainer}>
              <h1 className={styles.title}>{recipe.name}</h1>
              <h4 className={styles.author}>{`By ${recipe.author}`}</h4>
              <p>{recipe.description}</p>
            </div>
            {/* <div className={styles.imageContainer}></div> */}
          </div>
          <div className={styles.footerContainer}>
            <p className={styles.extraDetails}>{`${secondsToHoursMinutes(
              recipe.cookingTime
            )} • ${recipe.difficulty} • ${recipe.dateCreated
              .toDate()
              .toISOString()
              .substring(0, 10)}`}</p>
            <div className={styles.actionsContainer}>
              {!favs.includes(recipe.id!) ? (
                <BsBookmark
                  className={styles.bookmark}
                  onClick={onFavouriteHandler}
                />
              ) : (
                <BsBookmarkFill
                  className={styles.bookmark}
                  onClick={onFavouriteHandler}
                />
              )}
              {/* <div className={styles.ratingContainer}>
              <FiThumbsUp className={styles.thumbsUp} />
              <FiThumbsDown className={styles.thumbsDown} />
            </div> */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RecipeCard;
