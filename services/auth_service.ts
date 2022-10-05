import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { createUserDoc } from "./db_service";

/**
 * Create new user with `email` and `password`. Set `displayName` in the user's FirebaseAuth profile. Create a doc for the user in the Firestore users collection with the id set to the user's uid from FirebaseAuth.
 *
 * @param email
 * @param password
 * @param displayName - FirebaseAuth user-profile display-name
 */
export const signUp = async (
  email: string,
  password: string,
  displayName: string
) => {
  console.log("FIREBASE_AUTH: signUp");
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  // Add display name to user profile
  await updateProfile(credential.user, { displayName: displayName });
  // Create user doc in users collection
  await createUserDoc(email, credential.user.uid);
};

/**
 * Login to FirebaseAuth with `email` and `password`
 *
 * @param email
 * @param password
 */
export const login = async (email: string, password: string) => {
  console.log("FIREBASE_AUTH: login");
  await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign out current authenticated user
 */
export const logout = async () => {
  console.log("FIREBASE_AUTH: logout");
  await signOut(auth);
};
