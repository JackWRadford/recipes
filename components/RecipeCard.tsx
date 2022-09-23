import Image from "next/image";
import styles from "../styles/RecipeCard.module.css";
import {
  FiArrowUp,
  FiBookmark,
  FiThumbsDown,
  FiThumbsUp,
} from "react-icons/fi";

const RecipeCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.detailsContainer}>
        <h1 className={styles.title}>Cheesy tuna melts</h1>
        <h4 className={styles.author}>By Jack Radford</h4>
        <p>A tasty change from cheese on toast!</p>
        <span>30mins • 5 Ingredients • 23 Sep 2022</span>
      </div>
      <div className={styles.bookmarkContainer}>
        <FiBookmark className={styles.bookmark} />
        <div className={styles.ratingContainer}>
          <FiThumbsUp className={styles.thumbsUp} />
          <FiThumbsDown className={styles.thumbsDown} />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
