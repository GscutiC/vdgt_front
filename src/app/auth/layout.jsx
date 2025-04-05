
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }) => {
  return (
    <div className="h-screen flex w-full justify-center">
      {children}
    </div>
  );
};

export default Layout;
