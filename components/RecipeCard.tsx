import styles from "../styles/RecipeCard.module.css";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import Link from "next/link";
import { Recipe } from "../models/Recipe";
import React, { FC, MouseEventHandler, useContext, useState } from "react";
import { secondsToHoursMinutes } from "../helper/ConvertionHelpers";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import Modal from "./shared/Modal";

interface IRecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: FC<IRecipeCardProps> = ({ recipe }) => {
  const { user, favs, setFavs } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  /// toggle recipe favourite
  const onFavouriteHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      // Alert user to authenticate to favourite recipes
      setShowModal(true);
      return;
    }
    const index = favs.indexOf(recipe.id!, 0);
    const newFavs = [...favs];
    if (index > -1) {
      newFavs.splice(index, 1);
    } else {
      newFavs.push(recipe.id!);
    }
    // Update database
    const docRef = doc(db, "users", user!.uid);
    await setDoc(docRef, { favourites: newFavs }, { merge: true });
    // Update locally
    setFavs(newFavs);
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
