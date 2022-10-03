import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore/lite";
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
  const [lastRecipe, setLastRecipe] = useState<QueryDocumentSnapshot<Recipe>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    /// Get recipes from firestore
    const fetchRecipes = async () => {
      console.log("FIRESTORE: fetchRecipes");
      const recipesQueryFirst = query(
        collection(db, "recipes").withConverter(recipeConverter),
        orderBy("dateCreated", "desc"),
        limit(6)
      );
      const recipesSnapshots = await getDocs(recipesQueryFirst);
      const lastVisible =
        recipesSnapshots.docs[recipesSnapshots.docs.length - 1];
      const recipesList = recipesSnapshots.docs.map((doc) => doc.data());
      setLastRecipe(lastVisible);
      setRecipes(recipesList);
      return recipesList;
    };

    fetchRecipes();
  }, []);

  const loadMore = async () => {
    if (!lastRecipe) return;
    setIsLoading(true);
    console.log("FIRESTORE: fetchRecipes");
    const recipesQueryNext = query(
      collection(db, "recipes").withConverter(recipeConverter),
      orderBy("dateCreated", "desc"),
      startAfter(lastRecipe),
      limit(6)
    );
    const recipesSnapshots = await getDocs(recipesQueryNext);
    const lastVisible = recipesSnapshots.docs[recipesSnapshots.docs.length - 1];
    const recipesList = recipesSnapshots.docs.map((doc) => doc.data());
    setLastRecipe(lastVisible);
    setRecipes((oldRecipes) => [...oldRecipes, ...recipesList]);
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <div className={styles.contentWrapper}>
        <RecipesList
          recipes={recipes}
          loadMore={loadMore}
          noMoreRecipes={typeof lastRecipe === "undefined"}
          isLoading={isLoading}
        />
        <SearchArea />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
