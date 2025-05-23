"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut,User } from "firebase/auth";
import { db,auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

// Create the context, initially null
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }:{children:ReactNode}) => {
  const [user, setUser] = useState<User|null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const adminRef = doc(db, "config", "admin");
          const adminSnap = await getDoc(adminRef);
          const adminEmails = adminSnap.data()?.emails || [];
          setIsAdmin(adminEmails.includes(u.email));
        } catch (error) {
          console.error("Failed to fetch admin list:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};