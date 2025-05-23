"use client";
import { deleteUser, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import { useAuth } from "@/utils/AuthContext";
import { AuthProvider } from "@/utils/AuthContext";

const clearUser = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
      // If user is anonymous, delete the account
      if (currentUser.isAnonymous) {
        await deleteUser(currentUser);
      } else {
        await signOut(auth);
      }
    } catch (err) {
      console.error("Failed to clear user:", err);
      await signOut(auth); // fallback: force sign out
    }
  }
};

export default function AdminPage() {
  const { user, isAdmin, login, logout, loading } = useAuth();

  useEffect(() => {
    const clearIfAnonymous = async () => {
      if (!loading && user && !isAdmin && user.isAnonymous) {
        try {
          await deleteUser(user);
        } catch (e) {
          console.warn("Failed to delete anonymous user:", e);
          await signOut(auth);
        }
      }
    };
    clearIfAnonymous();
  }, [user, isAdmin, loading]);

  if (loading)
    return (
      <div className="p-10 bg-primary h-fit ml-20 mt-20 rounded-full text-white">
        <p className="">Loading...</p>{" "}
      </div>
    );
  if (!user)
    return (
      <div className="p-10 bg-primary h-fit ml-20 mt-20 rounded-full text-white">
        <button onClick={login}>Login with Google</button>{" "}
      </div>
    );
  if (!isAdmin)
    return (
      <div className="p-10 bg-primary h-fit ml-20 mt-20 rounded-full text-white">
        <p>
          Access denied. You are not an admin.{" "}
          <span
            className="bg-white text-primary px-4 py-2 rounded-full"
            onClick={login}
          >
            log in
          </span>
        </p>
        ;
      </div>
    );
  return (
          <div className="p-10 bg-primary h-fit ml-20 mt-20 rounded-full text-white">

      <h1>Welcome, Admin {user.email}</h1>
      <button
        className="bg-white text-primary px-4 py-2 rounded-full mx-auto"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
