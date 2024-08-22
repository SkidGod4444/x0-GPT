"use client";
import { useEffect } from "react";
import { useAuth } from "./auth.context";
import LoadingScreen from "@/components/custom/loading-screen";
import RedirectingScreen from "@/components/custom/redirecting-screen";
import { usePathname, useRouter } from "next/navigation";

export const RoutesContext = ({
  children,
  protectedRoutes,
  publicRoutes,
}: {
  children: React.ReactNode;
  protectedRoutes: string[];
  publicRoutes: string[];
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!loading) {
      const handleRedirect = async () => {
        if (user && publicRoutes.includes(path)) {
          await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 0.5 seconds
          router.replace("/chat");
        } else if (!user && protectedRoutes.includes(path)) {
          await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 0.5 seconds
          router.replace("/");
        }
      };

      handleRedirect();
    }
  }, [user, loading, path, publicRoutes, protectedRoutes, router]);

  // Show the loading screen if loading and on a protected route
  if (loading && protectedRoutes.includes(path)) {
    return <LoadingScreen />;
  }

  // Show the redirecting screen while the redirect is in progress
  if (
    (!loading && user && publicRoutes.includes(path)) ||
    (!loading && !user && protectedRoutes.includes(path))
  ) {
    return <RedirectingScreen />;
  }

  return children;
};
