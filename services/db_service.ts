import {
  collection,
  deleteDoc,
  doc,
  documentId,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  setDoc,
  where,
  startAfter,
  QueryConstraint,
  addDoc,
} from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { Recipe, recipeConverter } from "../models/recipe";

/** Users firestore collection identifier */
const USERS_COL = "users";
/** Recipes firestore collection identifier */
const RECIPES_COL = "recipes";

/** The limit for pageination when fetching recipes */
export const RECIPE_FETCH_LIMIT = 6;

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

/**
 * Fetch recipe document data for the given `id`.
 *
 * @param id - Unique recipe id
 * @returns A Promise of the recipe DocumentSnapshot
 */
export const fetchRecipe = async (
  id: string
): Promise<DocumentSnapshot<Recipe>> => {
  console.log("FIRESTORE: fetchRecipe");
  const docRef = doc(db, RECIPES_COL, id).withConverter(recipeConverter);
  return await getDoc(docRef);
};

/**
 * Versitile fetch recipes function to either, fetch all recipes, recipes in `favourites` or recipes published by user `uid`.
 *
 * @param favourites - List of favourited recipe ids
 * @param uid - Unique user id given from FirebaseAuth credentials
 * @param lastRecipe - Last recipe QueryDocumentSnapshot returned (from a previous query)
 * @param searchTerm - Search for recipes where the name includes one of these terms
 * @returns A Promise of an object containing an array of Recipes and the last QueryDocumentSnapshot
 */
export const fetchRecipes = async (
  favourites?: string[],
  uid?: string,
  lastRecipe?: QueryDocumentSnapshot<Recipe>,
  searchTerm?: string
): Promise<{
  recipes: Recipe[];
  last: QueryDocumentSnapshot<Recipe>;
}> => {
  console.log("FIRESTORE: fetchRecipes");
  const colRef = collection(db, RECIPES_COL).withConverter(recipeConverter);
  const queryContraints: QueryConstraint[] = [limit(RECIPE_FETCH_LIMIT)];

  // Add where recipe userId == uid (for published)
  if (uid) queryContraints.push(where("userId", "==", uid));
  // Add where recipe id is in favourite ids (for favourites)
  if (favourites) queryContraints.push(where(documentId(), "in", favourites));
  // Add where recipe nameKeyTerms includes one or more of the searchTerms (for search)
  if (searchTerm)
    queryContraints.push(
      where("nameKeyTerms", "array-contains-any", searchTerm.split(" "))
    );
  // Add startAfter (for pageination)
  if (lastRecipe) queryContraints.push(startAfter(lastRecipe));

  const q = query(colRef, ...queryContraints);
  const recipesSnapshots = await getDocs(q);
  // Get the last recipe snapshot for pagination
  const lastVisible = recipesSnapshots.docs[recipesSnapshots.docs.length - 1];
  // Convert recipe snapshots to Recipes
  const recipesList = recipesSnapshots.docs.map((doc) => doc.data());
  return { recipes: recipesList, last: lastVisible };
};

/**
 * Add the new `recipe` to the recipes collection.
 *
 * @param recipe - New recipe
 * @returns The id of the new recipe doc in the recipes collections
 */
export const addRecipe = async (recipe: Recipe): Promise<string> => {
  console.log("FIRESTORE: addRecipe");
  const recipeDoc = await addDoc(
    collection(db, RECIPES_COL).withConverter(recipeConverter),
    recipe
  );
  return recipeDoc.id;
};

/**
 * Update the given `recipe` doc.
 *
 * @param recipe - The updated recipe
 */
export const updateRecipe = async (recipe: Recipe) => {
  const docRef = doc(db, RECIPES_COL, recipe.id!).withConverter(
    recipeConverter
  );
  await setDoc(docRef, recipe, { merge: true });
};
