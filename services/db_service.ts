import { doc, setDoc } from "firebase/firestore/lite";
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
