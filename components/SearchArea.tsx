import { ChangeEvent } from "react";
import styles from "../styles/SearchArea.module.css";
import Input from "./shared/Input";

const SearchArea = () => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Find a new recipe!</h3>
      <Input
        type={"search"}
        name={""}
        value={""}
        placeholder={"Search"}
        onChange={function (event: ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default SearchArea;
