import type { NextPage } from "next";
import { useContext } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RecipesList from "../components/RecipesList";
import SearchArea from "../components/SearchArea";
import { RecipesContext } from "../context/RecipesContext";
import styles from "../styles/HomePage.module.css";

const HomePage: NextPage = () => {
  const recipesCtx = useContext(RecipesContext);

  return (
    <>
      <Header />
      <div className={styles.contentWrapper}>
        <RecipesList recipes={recipesCtx.recipes} />
        <SearchArea />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
