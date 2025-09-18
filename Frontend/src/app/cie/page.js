"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Megaphone, CalendarDays, User, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios"; // ✅ don't forget this import

export default function AnnouncementsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  //fetching
  const [announcements, setAnnouncements] = useState([]);

  const fetchCies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/cie", {
        withCredentials: true,
      });

      setAnnouncements(res.data.data);
      console.log("data: ",res.data.data);
    } catch (err) {
      console.error("Error fetching CIE announcements:", err);
    }
  };

  useEffect(() => {
    fetchCies();
  }, []);
  //ending

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
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-slate-900 border border-slate-800 hover:border-[#47c0e8] 
                           rounded-2xl p-6 shadow-md hover:shadow-xl 
                           transition transform hover:-translate-y-1"
              >
                {/* Header: Uploader + Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-[#47c0e8]" />
                    <h2 className="font-semibold text-lg">
                      {a.uploadedBy?.[0]?.name || "Unknown"}
                    </h2>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <CalendarDays className="w-4 h-4" />
                    <span>
                      {new Date(a.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-3">
                  {a.description}
                </p>

                {/* Extra info: Time + Venue */}
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#47c0e8]" />
                    <span>{a.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#47c0e8]" />
                    <span>{a.venue}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
