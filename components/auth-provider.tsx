"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

const publicPaths = ['/', '/login', '/register', '/forgot-password'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, initialize } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isLoading) {
      const isPublicPath = publicPaths.includes(pathname);

      if (!isAuthenticated && pathname.startsWith('/dashboard')) {
        router.replace('/login');
      } else if (isAuthenticated && isPublicPath && pathname !== '/') {
        router.replace('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return null;
  }

  return children;
}