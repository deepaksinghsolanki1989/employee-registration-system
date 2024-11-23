"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { GET_CURRENT_USER } from "@/redux/action.types";
import { RootState } from "@/redux/store";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch({ type: GET_CURRENT_USER });
  }, []);

  useEffect(() => {
    if (error && !user) return redirect("/sign-in");
  }, [error, user]);

  return (
    <main className="flex h-screen">
      {!user && loading && (
        <Image
          src="/assets/icons/loader.svg"
          alt="logo"
          width={24}
          height={24}
          className="ml-2 animate-spin"
        />
      )}
      {user && (
        <>
          <Sidebar {...user} />
          <section className="flex h-full flex-1 flex-col">
            <MobileNavigation {...user} />
            <Header />
            <div className="main-content">{children}</div>
          </section>
          <Toaster />
        </>
      )}
    </main>
  );
};
export default Layout;
