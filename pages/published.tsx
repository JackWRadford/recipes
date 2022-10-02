import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import AuthBarrier from "../components/auth/AuthBarrier";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RecipesList from "../components/RecipesList";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { Recipe, recipeConverter } from "../models/Recipe";
import styles from "../styles/PublishedPage.module.css";

const PublishedPage: NextPage = () => {
  const { user } = useContext(AuthContext);
  const [published, setPublished] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchPublished = async () => {
      if (!user) return;
      console.log("FIRESTORE: fetchPublished");
      const recipesRef = collection(db, "recipes").withConverter(
        recipeConverter
      );
      const q = query(recipesRef, where("userId", "==", user?.uid));
      const recipesSnapshot = await getDocs(q);
      const recipesList = recipesSnapshot.docs.map((doc) => doc.data());
      setPublished(recipesList);
      return recipesList;
    };

    fetchPublished();
  }, [user]);

  return (
    <>
      <Header />
      {user ? (
        <div className={styles.contentWrapper}>
          <h2>Your recipes</h2>
          <RecipesList recipes={published} />
        </div>
      ) : (
        <AuthBarrier label={"see your recipes"} />
      )}
      <Footer />
    </>
  );
};

export default PublishedPage;
