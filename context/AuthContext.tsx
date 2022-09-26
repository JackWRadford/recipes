import React, { createContext, FC, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebaseConfig";

const AuthContext = createContext<User | null>(null);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) =>
      setUser(firebaseUser)
    );

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
