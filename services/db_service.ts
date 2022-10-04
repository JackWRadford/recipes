import { deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";

/** Users firestore collection identifier */
export const USERS_COL = "users";

/** Recipes firestore collection identifier */
export const RECIPES_COL = "recipes";

/**
 * Create user doc in users collection
 *
 * @param email - Email used to create user with FirebaseAuth
 * @param uid - Unique user id given from FirebaseAuth credentials
 */
export const createUserDoc = async (email: string, uid: string) => {
  const docRef = doc(db, USERS_COL, uid);
  await setDoc(docRef, {
    email: email,
    favourites: [],
  });
};

/**
 * Delete the document with the given `id` from the recipes collection
 *
 * @param id - The id of the recipe to be deleted.
 */
export const deleteRecipe = async (id: string) => {
  const docRef = doc(db, RECIPES_COL, id);
  await deleteDoc(docRef);
};

/**
 * Update the user's doc with the new favourites list.
 *
 * @param uid - Unique user id given from FirebaseAuth credentials
 * @param newFavourites - The updated list of favourite recipe ids
 */
export const updateUserFavourites = async (
  uid: string,
  newFavourites: string[]
) => {
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, { favourites: newFavourites }, { merge: true });
};
