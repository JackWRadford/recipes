import React, { createContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { fetchUserFavourites } from "../services/db_service";

export interface IAuthContext {
  user: User | null;
  favs: string[];
  setFavs: (newFavs: string[]) => void;
}

/**
 * Includes the FirebaseAuth `user`, their favourite recipe ids `favs` and `setFavs` to update the list.
 */
const AuthContext = createContext<IAuthContext>({
  user: null,
  favs: [],
  setFavs: (newFavs: string[]) => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

/**
 * Auth provider to wrap the given `children`.
 */
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
      const favouriteIds = await fetchUserFavourites(uid);
      setUserFavs(favouriteIds);
    };

    /**
     * Subscribe to the FirebaseAuth state changes. (SignIn, SignOut)
     */
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
