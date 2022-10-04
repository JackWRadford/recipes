import React, { createContext, FC, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore/lite";

export interface IAuthContext {
  user: User | null;
  favs: string[];
  setFavs: (newFavs: string[]) => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  favs: [],
  setFavs: (newFavs: string[]) => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userFavs, setUserFavs] = useState<string[]>([]);

  useEffect(() => {
    /**
     * Fetch user's favourite recipe ids list
     *
     * @param uid - The unique user id from Firebase Auth
     */
    const fetchUserFavs = async (uid: string) => {
      console.log("FIRESTORE: fetchUserFavourites");
      const docRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(docRef);
      const userData = userSnapshot.data();
      setUserFavs(userData ? userData.favourites : []);
    };

    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // Get user's favourites
        fetchUserFavs(firebaseUser.uid);
      } else {
        // Reset favourites to empty array if no authenticated user
        setUserFavs([]);
      }
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  /**
   * Set local favourites list to a new one
   *
   * @param newFavs - The new list of favourite recipe ids
   */
  const setFavs = (newFavs: string[]) => {
    setUserFavs(newFavs);
  };

  return (
    <AuthContext.Provider
      value={{ user: user, favs: userFavs, setFavs: setFavs }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
