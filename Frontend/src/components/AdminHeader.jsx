"use client";
import React from "react";
import { PanelLeft, LogOut } from "lucide-react";

const AdminHeader = ({ toggleSidebar }) => {
  return (
    <header className="bg-[#1f2a5c] w-full h-16 flex items-center px-4 shadow-sm text-white">
      <div className="w-full flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
          >
            <PanelLeft className="w-6 h-6" />
          </button>
          <span className="text-xl font-bold">Admin Panel</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-2 bg-red-600 rounded-lg hover:bg-red-700 text-sm">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
