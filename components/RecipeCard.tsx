import styles from "../styles/RecipeCard.module.css";
import { FiBookmark } from "react-icons/fi";
import Link from "next/link";
import { Recipe } from "../models/Recipe";
import { FC } from "react";
import { secondsToHoursMinutes } from "../helper/ConvertionHelpers";

interface IRecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: FC<IRecipeCardProps> = ({ recipe }) => {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className={styles.wrapper}>
        <div className={styles.contentContainer}>
          <div className={styles.detailsContainer}>
            <h1 className={styles.title}>{recipe.name}</h1>
            <h4 className={styles.author}>{`By ${recipe.author}`}</h4>
            <p>{recipe.description}</p>
          </div>
          <div className={styles.imageContainer}></div>
        </div>
        <div className={styles.footerContainer}>
          <p className={styles.extraDetails}>{`${secondsToHoursMinutes(
            recipe.cookingTime
          )} • ${recipe.difficulty} • ${recipe.dateCreated
            .toDate()
            .toISOString()
            .substring(0, 10)}`}</p>
          <div className={styles.actionsContainer}>
            <FiBookmark className={styles.bookmark} />
            {/* <div className={styles.ratingContainer}>
              <FiThumbsUp className={styles.thumbsUp} />
              <FiThumbsDown className={styles.thumbsDown} />
            </div> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
