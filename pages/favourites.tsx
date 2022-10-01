import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import AuthBarrier from "../components/auth/AuthBarrier";
import Header from "../components/Header";
import RecipesList from "../components/RecipesList";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { Recipe, recipeConverter } from "../models/Recipe";
import styles from "../styles/FavouritesPage.module.css";

const FavouritesPage: NextPage = () => {
  const { user, favs } = useContext(AuthContext);
  const [favourites, setFavourites] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!user) return;
      console.log("FIRESTORE: fetchFavourites");
      const recipesRef = collection(db, "recipes").withConverter(
        recipeConverter
      );
      const favouriteRecipeIds: string[] = [...favs];
      if (!favouriteRecipeIds.length) return;
      const q = query(
        recipesRef,
        where(documentId(), "in", favouriteRecipeIds)
      );
      const recipesSnapshot = await getDocs(q);
      const recipesList = recipesSnapshot.docs.map((doc) => doc.data());
      setFavourites(recipesList);
      return recipesList;
    };

    fetchFavourites();
  }, [user, favs]);

  return (
    <>
      <Header />
      {user ? (
        <div className={styles.contentWrapper}>
          <h2>Favourites</h2>
          <RecipesList recipes={favourites} />
        </div>
      ) : (
        <AuthBarrier label={"see your favourite recipes"} />
      )}
    </>
  );
};

export default FavouritesPage;
