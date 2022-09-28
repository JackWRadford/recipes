import type { NextPage } from "next";
import Header from "../components/Header";
import RecipesList from "../components/RecipesList";
import SearchArea from "../components/SearchArea";
import styles from "../styles/HomePage.module.css";

const ManagePage: NextPage = () => {
  return (
    <>
      <Header />
      <div className={styles.contentWrapper}>
        <h2>Create a recipe</h2>
      </div>
    </>
  );
};

export default ManagePage;
