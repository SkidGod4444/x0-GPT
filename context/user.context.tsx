"use client";
import { GoogleSignIn } from "@/db/func";
import { AppwriteUser } from "@/db/init";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type User = Models.User<Models.Preferences>;
interface UserContextValue {
  current: User | null;
  session: any;
  signIn: () => Promise<boolean | string | undefined>;
  signOut: () => Promise<boolean | string | undefined>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  async function signIn() {
    const loggedIn = await GoogleSignIn();
    setSession(loggedIn);
    router.push("/chat")
    return true;
  }

async function signOut() {
    setSession(null);
    await AppwriteUser.deleteSession("current");
    window.location.reload(); // Reload the page after logout
    return true;
}

  async function init() {
    try {
      const loggedIn = await AppwriteUser.get();
      // console.log(loggedIn);
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
      console.log(err);
    }
  }
  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{ current: user, session, signIn, signOut }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const value = useContext(UserContext);
  if (!value) {
    throw new Error("useAuth must be used within an UserProvider");
  }
  return value;
};