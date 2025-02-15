"use client";

// Libraries
// import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// Components
// import { PageLoading } from "@/app/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const { status } = useSession();

  //   if (status === "loading") {
  //     return <PageLoading />;
  //   }

  //   if (status === "authenticated") {
  //     redirect("/");
  //   }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
