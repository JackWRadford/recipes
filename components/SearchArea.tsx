import { ChangeEvent, FC, FormEventHandler, useState } from "react";
import styles from "../styles/SearchArea.module.css";
import Button from "./shared/Button";
import Input from "./shared/Input";

interface ISearchAreaProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const SearchArea: FC<ISearchAreaProps> = ({ onSubmit, isLoading }) => {
  const [searchValue, setSearchValue] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(searchValue);
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.wrapper}>
      <h3 className={styles.title}>Find a new recipe!</h3>
      <Input
        type={"search"}
        name={"searchrecipes"}
        value={searchValue}
        placeholder={"Cookie"}
        onChange={onChangeHandler}
      />
      <Button
        type={"submit"}
        name={""}
        label={"Search"}
        isLoading={isLoading}
      />
    </form>
  );
};

export default SearchArea;
