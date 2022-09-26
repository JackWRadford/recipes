import type { NextPage } from "next";
import Header from "../components/Header";
import RecipesList from "../components/RecipesList";
import SearchArea from "../components/SearchArea";
import styles from "../styles/HomePage.module.css";

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <div className={styles.contentWrapper}>
        <RecipesList />
        <SearchArea />
      </div>
    </>
  );
};

export default HomePage;
