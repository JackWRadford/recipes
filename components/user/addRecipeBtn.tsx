import { useRouter } from "next/router";
import Button from "../shared/Button";
import styles from "../../styles/CallToActionBtn.module.css";

const AddRecipeBtn = () => {
  const router = useRouter();

  return (
    <Button
      className={styles.button}
      type={"button"}
      name={"addrecipe"}
      label={"Add Recipe"}
      onClick={() => router.push("/manage")}
    />
  );
};

export default AddRecipeBtn;
