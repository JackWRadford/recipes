import { useRouter } from "next/router";
import Button from "../ui/Button";
import styles from "../../styles/CallToActionBtn.module.css";

/**
 * Button to navigate to manage page with no recipe data (to add a new recipe)
 */
const AddRecipeBtn = () => {
  const router = useRouter();

  const onClickHandler = () => {
    router.push("/manage");
  };

  return (
    <Button
      className={styles.button}
      type={"button"}
      name={"addrecipe"}
      label={"Add Recipe"}
      onClick={onClickHandler}
    />
  );
};

export default AddRecipeBtn;
