import {
  collection,
  documentId,
  endBefore,
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
import Footer from "../components/Footer";
import Header from "../components/Header";
import RecipesList from "../components/RecipesList";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { Recipe, recipeConverter } from "../models/Recipe";
import styles from "../styles/FavouritesPage.module.css";

const FavouritesPage: NextPage = () => {
  const { user, favs } = useContext(AuthContext);
  const [favourites, setFavourites] = useState<Recipe[]>([]);
  const [lastRecipe, setLastRecipe] = useState<QueryDocumentSnapshot<Recipe>>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!user || !isFirstLoad) return;
      console.log("FIRESTORE: fetchFavourites");
      if (!favs.length) {
        setFavourites([]);
        return;
      }
      const queryFirst = query(
        collection(db, "recipes").withConverter(recipeConverter),
        where(documentId(), "in", favs),
        limit(2)
      );
      const recipesSnapshots = await getDocs(queryFirst);
      const lastVisible =
        recipesSnapshots.docs[recipesSnapshots.docs.length - 1];
      const recipesList = recipesSnapshots.docs.map((doc) => doc.data());
      setIsFirstLoad(false);
      setLastRecipe(lastVisible);
      setFavourites(recipesList);
      return recipesList;
    };

    fetchFavourites();
  }, [user, favs, isFirstLoad]);

  const loadMore = async () => {
    if (!lastRecipe) return;
    setIsLoading(true);
    console.log("FIRESTORE: fetchPublished");
    const recipesQueryNext = query(
      collection(db, "recipes").withConverter(recipeConverter),
      where(documentId(), "in", favs),
      startAfter(lastRecipe),
      limit(2)
    );
    const recipesSnapshots = await getDocs(recipesQueryNext);
    const lastVisible = recipesSnapshots.docs[recipesSnapshots.docs.length - 1];
    const recipesList = recipesSnapshots.docs.map((doc) => doc.data());
    setLastRecipe(lastVisible);
    setFavourites((oldRecipes) => [...oldRecipes, ...recipesList]);
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      {user ? (
        <div className={styles.contentWrapper}>
          <h2>Favourites</h2>
          <RecipesList
            recipes={favourites}
            loadMore={loadMore}
            noMoreRecipes={typeof lastRecipe === "undefined"}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <AuthBarrier label={"see your favourite recipes"} />
      )}
      <Footer />
    </>
  );
};

export default FavouritesPage;
