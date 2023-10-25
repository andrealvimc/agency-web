"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode, Suspense } from "react";

interface Props {
  children: ReactNode;
}
function Session({ children }: Props) {
  return <Suspense fallback={"Session provider loading..."}>
    <SessionProvider>{children}</SessionProvider>
  </Suspense>
  
}

export default Session;