"use client";

import { assets } from "../Assets/assets";
import Sidebar from "../Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }) {
  return (
    <div className="flex">
      {/* Toast Notifications */}
      <ToastContainer position="top-right" theme="dark" />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex items-center justify-between w-full py-3 px-12 border-b">
          <h3 className="font-medium">Admin Panel</h3>
          <Image
            src={assets.profile_icon}
            width={40}
            height={40}
            alt="Profile"
          />
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-12">
          {children}
        </div>
      </div>
    </div>
  );
}
