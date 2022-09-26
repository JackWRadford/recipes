import { ChangeEvent } from "react";
import styles from "../styles/SearchArea.module.css";
import Button from "./shared/Button";
import Input from "./shared/Input";

const SearchArea = () => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Find a new recipe!</h3>
      <Input
        type={"search"}
        name={""}
        value={""}
        placeholder={"Chocolate cake"}
        onChange={function (event: ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Button type={"button"} name={""} label={"Search"} onClick={undefined} />
    </div>
  );
};

export default SearchArea;
