"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LoadingScreen from "@/components/custom/loading-screen";
import RedirectingScreen from "@/components/custom/redirecting-screen";
import { useUser } from "./user.context";

export const AuthWrapper = ({ children }: any) => {
  const { current } = useUser();
  const [isUser, setIsUser] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    setLoading(true); // Start loading

    const timeoutId = setTimeout(() => {
      if (current) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
      setLoading(false); // Stop loading after user state is determined
    }, 1400); // 1.4 second delay

    return () => clearTimeout(timeoutId); // Clean up the timeout on unmount
  }, [current]);

  const publicRoutes = ["/", "/gateway"];
  const protectedRoutes = ["/chat", "/memories", "/archives"];

  // Show loading screen while determining user state
  if (loading && protectedRoutes.some((route) => path.includes(route))) {
    return <LoadingScreen />;
  }

  // Redirect if the user is signed in and trying to access public routes
  if (isUser && publicRoutes.includes(path)) {
    router.replace("/chat"); // Use replace to avoid redirect loops
    return <RedirectingScreen />;
  }

  // Redirect to home if trying to access a protected route without being signed in
  if (
    isUser === null &&
    protectedRoutes.some((route) => path.includes(route))
  ) {
    return <LoadingScreen />;
  } else {
    if (!isUser && protectedRoutes.some((route) => path.includes(route))) {
      router.replace("/");
      return <RedirectingScreen />;
    }
  }

  return children; // Render the children if no redirects are needed
};
