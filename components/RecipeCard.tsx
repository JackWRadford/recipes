import styles from "../styles/RecipeCard.module.css";
import { FiBookmark, FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import Link from "next/link";

const RecipeCard = () => {
  return (
    <Link href={"/recipe/123"}>
      <div className={styles.wrapper}>
        <div className={styles.contentContainer}>
          <div className={styles.detailsContainer}>
            <h1 className={styles.title}>Cheesy tuna melts</h1>
            <h4 className={styles.author}>By Jack Radford</h4>
            <p>A tasty change from cheese on toast!</p>
          </div>
          <div className={styles.imageContainer}></div>
        </div>
        <div className={styles.footerContainer}>
          <p className={styles.extraDetails}>30mins • Easy • 23 Sep 2022</p>
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
