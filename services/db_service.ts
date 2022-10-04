import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore/lite";
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
  console.log("FIRESTORE: createUserDoc");
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
  console.log("FIRESTORE: deleteRecipe");
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
  console.log("FIRESTORE: updateUserFavourites");
  const docRef = doc(db, USERS_COL, uid);
  await setDoc(docRef, { favourites: newFavourites }, { merge: true });
};

/**
 * Fetch the given user's list of favourite recipe ids.
 *
 * @param uid - Unique user id given from FirebaseAuth credentials
 * @returns A Promise of the array of favourite recipe ids
 */
export const fetchUserFavourites = async (uid: string): Promise<string[]> => {
  console.log("FIRESTORE: fetchUserFavourites");
  const docRef = doc(db, USERS_COL, uid);
  const userSnapshot = await getDoc(docRef);
  const userData = userSnapshot.data();
  return userData ? userData.favourites : [];
};
