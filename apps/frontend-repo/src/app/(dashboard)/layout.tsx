"use client";

// Libraries
import React, { useEffect, useMemo } from "react";

// Components

// Constants
// import { ROUTES } from "@/constants/routes";

// Utils

const PATH = "src/app/(dashboard)/layout.tsx";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const segments = useSelectedLayoutSegments();
  //   const { status, data } = useSession();

  //   if (status === "loading") {
  //     return <PageLoading />;
  //   }

  //   if (status === "unauthenticated") {
  //     redirect(ROUTES.LOGIN.path);
  //   }

  //   const isHasViewPermission = true;
  return (
    <div>Dashboard layout</div>
    // <Layout
    //   header={
    //     {
    //       // title: headerTitle,
    //     }
    //   }
    // >
    //   {isHasViewPermission || isEmpty(segments) ? children : <AccessDenied />}

    //   <UserResetPassword />
    // </Layout>
  );
}
