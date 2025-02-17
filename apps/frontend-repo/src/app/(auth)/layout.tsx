"use client";

// Libraries
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    redirect("/");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
