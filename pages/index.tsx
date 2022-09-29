import type { NextPage } from "next";
import { useContext } from "react";
import Header from "../components/Header";
import RecipesList from "../components/RecipesList";
import SearchArea from "../components/SearchArea";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/HomePage.module.css";

const HomePage: NextPage = () => {
  const authCtx = useContext(AuthContext);

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
