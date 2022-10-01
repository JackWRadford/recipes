import React, { createContext, FC, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { Recipe } from "../models/Recipe";
import { doc, getDoc } from "firebase/firestore/lite";

export interface IAuthContext {
  user: User | null;
  favs: string[];
}

const AuthContext = createContext<IAuthContext>({ user: null, favs: [] });

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userFavs, setUserFavs] = useState<string[]>([]);

  useEffect(() => {
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

  return (
    <AuthContext.Provider value={{ user: user, favs: userFavs }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
