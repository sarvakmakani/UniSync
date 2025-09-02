"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Megaphone, CalendarDays, User } from "lucide-react";
import { motion } from "framer-motion";

export default function AnnouncementsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const announcements = [
    {
      id: 1,
      professor: "Prof. Kashyap Patel",
      message:
        "We are having ML CIE on Thursday, 28/08/2025 in 4th slot (2:20 PM - 3:20 PM).",
      date: "26 Aug 2025",
    },
    {
      id: 2,
      professor: "Prof. Premal Patel",
      message:
        "DAA CIE scheduled on Friday, 29/08/2025 during 2nd slot (10:10 AM - 11:10 AM).",
      date: "26 Aug 2025",
    },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      {sidebarOpen && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          mode="vault"
        />
      )}

      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header toggleSidebar={toggleSidebar} />

        {/* Header Section */}
        <div className="p-6">
          <div className="bg-gradient-to-r from-[#47c0e8] via-[#3b82f6] to-[#6366f1] rounded-2xl shadow-lg p-6 mb-8 flex items-center gap-3">
            <Megaphone className="w-8 h-8 text-white drop-shadow-md" />
            <h1 className="text-3xl font-bold tracking-tight">
              CIE Announcements
            </h1>
          </div>

          {/* Announcement Cards */}
          <div className="grid gap-5">
            {announcements.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-slate-900 border border-slate-800 hover:border-[#47c0e8] 
                           rounded-2xl p-6 shadow-md hover:shadow-xl 
                           transition transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-[#47c0e8]" />
                    <h2 className="font-semibold text-lg">{a.professor}</h2>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <CalendarDays className="w-4 h-4" />
                    <span>{a.date}</span>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{a.message}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
