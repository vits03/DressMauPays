"use client";

import React, { ReactNode } from "react";
import { AuthProvider, useAuth } from "@/utils/AuthContext";
import Link from "next/link";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <div className="flex ">
          <Sidebar />
            
            {children}
          
      </div>
    </AuthProvider>
  );
};

const Sidebar = () => {
  const { logout } = useAuth(); // safe here because inside AuthProvider

  return (
    <div className="w-[15rem] h-[90vh] flex flex-col bg-white  justify-between items-center border-2 py-10">
      <div className="space-y-15">
          <div>
          <Link href="/admin">
            <div className="border-2 rounded-full px-4 py-2 bg-accent text-center">
              Home
            </div>
          </Link>
        </div>
        <div>
          <Link href="/admin/pendingreports">
            <div className="border-2 rounded-full px-4 py-2 bg-accent text-center">
              Pending Requests
            </div>
          </Link>
        </div>
        <div>
          <Link href="/admin/resolutionreports">
            <div className="border-2 rounded-full px-4 py-2 bg-accent text-center">
                        Resolution Requests

            </div>
          </Link>
        </div>
       
      </div>

      <button
        onClick={logout}
        className="border-2 rounded-full px-4 py-2 bg-accent text-center"
      >
        Sign out
      </button>
    </div>
  );
};

export default Layout;
