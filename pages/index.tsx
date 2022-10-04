import {
  collection,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore/lite";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import RecipesList from "../components/RecipesList";
import SearchArea from "../components/SearchArea";
import { db } from "../firebaseConfig";
import { Recipe, recipeConverter } from "../models/recipe";
import styles from "../styles/HomePage.module.css";

const HomePage: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [lastRecipe, setLastRecipe] = useState<QueryDocumentSnapshot<Recipe>>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    let recipesQueryNext: Query<Recipe>;
    if (searchTerm) {
      recipesQueryNext = query(
        collection(db, "recipes").withConverter(recipeConverter),
        where("nameKeyTerms", "array-contains-any", searchTerm.split(" ")),
        startAfter(lastRecipe),
        limit(6)
      );
    } else {
      recipesQueryNext = query(
        collection(db, "recipes").withConverter(recipeConverter),
        orderBy("dateCreated", "desc"),
        startAfter(lastRecipe),
        limit(6)
      );
    }

    const recipesSnapshots = await getDocs(recipesQueryNext);
    const lastVisible = recipesSnapshots.docs[recipesSnapshots.docs.length - 1];
    const recipesList = recipesSnapshots.docs.map((doc) => doc.data());
    setLastRecipe(lastVisible);
    setRecipes((oldRecipes) => [...oldRecipes, ...recipesList]);
    setIsLoading(false);
  };

  const onSubmitHandler = async (userQuery: string) => {
    console.log("FIRESTORE: queryRecipes");
    setIsLoading(true);
    userQuery.trim().toLowerCase();
    let recipesQueryFirst: Query<Recipe>;
    if (userQuery) {
      recipesQueryFirst = query(
        collection(db, "recipes").withConverter(recipeConverter),
        where("nameKeyTerms", "array-contains-any", userQuery.split(" ")),
        limit(6)
      );
    } else {
      recipesQueryFirst = query(
        collection(db, "recipes").withConverter(recipeConverter),
        orderBy("dateCreated", "desc"),
        limit(6)
      );
    }
    const recipesSnapshots = await getDocs(recipesQueryFirst);
    const lastVisible = recipesSnapshots.docs[recipesSnapshots.docs.length - 1];
    const recipesList = recipesSnapshots.docs.map((doc) => doc.data());
    setLastRecipe(lastVisible);
    setRecipes(recipesList);
    setSearchTerm(userQuery);
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
        <SearchArea onSubmit={onSubmitHandler} isLoading={isLoading} />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
