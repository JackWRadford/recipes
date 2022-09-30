import { deleteDoc, doc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { db } from "../../firebaseConfig";
import { Recipe } from "../../models/Recipe";
import styles from "../../styles/ActionsRow.module.css";
import Button from "../shared/Button";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface IActionsRow {
  recipe: Recipe;
}

const ActionsRow: FC<IActionsRow> = ({ recipe }) => {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const onDeleteHandler = () => {
    setShowConfirmModal(true);
  };

  const onCloseHandler = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className={styles.wrapper}>
      {showConfirmModal && (
        <ConfirmDeleteModal onClose={onCloseHandler} recipe={recipe} />
      )}
      <Button
        type={"button"}
        name={"deleterecipe"}
        label={"Delete"}
        onClick={onDeleteHandler}
      />
      <Button
        type={"button"}
        name={"editrecipe"}
        label={"Edit"}
        onClick={() =>
          router.push({
            pathname: "/manage",
            query: { recipe: JSON.stringify(recipe) },
          })
        }
      />
    </div>
  );
};

export default ActionsRow;
