import {
  collection,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore/lite";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import AuthBarrier from "../components/auth/AuthBarrier";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import RecipesList from "../components/RecipesList";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { Recipe, recipeConverter } from "../models/recipe";
import styles from "../styles/PublishedPage.module.css";

const PublishedPage: NextPage = () => {
  const { user } = useContext(AuthContext);
  const [published, setPublished] = useState<Recipe[]>([]);
  const [lastRecipe, setLastRecipe] = useState<QueryDocumentSnapshot<Recipe>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPublished = async () => {
      if (!user) return;
      console.log("FIRESTORE: fetchPublished");

      const queryFirst = query(
        collection(db, "recipes").withConverter(recipeConverter),
        where("userId", "==", user?.uid),
        limit(6)
      );
      const recipesSnapshots = await getDocs(queryFirst);
      const lastVisible =
        recipesSnapshots.docs[recipesSnapshots.docs.length - 1];
      const recipesList = recipesSnapshots.docs.map((doc) => doc.data());
      setLastRecipe(lastVisible);
      setPublished(recipesList);
      return recipesList;
    };

    fetchPublished();
  }, [user]);

  const loadMore = async () => {
    if (!lastRecipe) return;
    setIsLoading(true);
    console.log("FIRESTORE: fetchPublished");
    const recipesQueryNext = query(
      collection(db, "recipes").withConverter(recipeConverter),
      where("userId", "==", user?.uid),
      startAfter(lastRecipe),
      limit(6)
    );
    const recipesSnapshots = await getDocs(recipesQueryNext);
    const lastVisible = recipesSnapshots.docs[recipesSnapshots.docs.length - 1];
    const recipesList = recipesSnapshots.docs.map((doc) => doc.data());
    setLastRecipe(lastVisible);
    setPublished((oldRecipes) => [...oldRecipes, ...recipesList]);
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      {user ? (
        <div className={styles.contentWrapper}>
          <h2>Your recipes</h2>
          <RecipesList
            recipes={published}
            loadMore={loadMore}
            noMoreRecipes={typeof lastRecipe === "undefined"}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <AuthBarrier label={"see your recipes"} />
      )}
      <Footer />
    </>
  );
};

export default PublishedPage;
