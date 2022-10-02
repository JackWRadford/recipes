import { collection, getDocs } from "firebase/firestore/lite";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RecipesList from "../components/RecipesList";
import SearchArea from "../components/SearchArea";
import { db } from "../firebaseConfig";
import { Recipe, recipeConverter } from "../models/Recipe";
import styles from "../styles/HomePage.module.css";

const HomePage: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    /// Get recipes from firestore
    const fetchRecipes = async () => {
      console.log("FIRESTORE: fetchRecipes");
      const recipesCol = collection(db, "recipes").withConverter(
        recipeConverter
      );
      const recipesSnapshot = await getDocs(recipesCol);
      const recipesList = recipesSnapshot.docs.map((doc) => doc.data());
      setRecipes(recipesList);
      return recipesList;
    };

    fetchRecipes();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.contentWrapper}>
        <RecipesList recipes={recipes} />
        <SearchArea />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
