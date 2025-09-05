"use client";
import React, { useEffect,useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { Calendar, Users, Mic } from "lucide-react"; // icons
import axios from "axios";

export default function EventsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  
  //fetching
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/event", {
        withCredentials: true,
      });

      setEvents(res.data.data);
      console.log("data: ",res.data);
    } catch (err) {
      console.error("Error fetching EVENT announcements:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  //ending


  return (
    <div className="flex h-screen">
      {sidebarOpen && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          mode="vault"
        />
      )}
      <div className="flex-1 flex flex-col overflow-y-auto bg-gray-950">
        <Header toggleSidebar={toggleSidebar} />

        {/* Page Header */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white">University Events</h1>
          <p className="text-gray-400 mt-2">
            Stay updated with the latest talks, sessions, and activities
          </p>
        </div>

        {/* Events Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gradient-to-tr from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition group"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-full bg-gray-700">
                  {<Mic className="text-blue-400 w-6 h-6" />}
                </div>
                <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition">
                  {event.name}
                </h2>
              </div>
              <p className="text-gray-400 text-sm mb-4">{event.description}</p>
              <div className="space-y-1 text-gray-300 text-sm">
                <p>
                  <span className="font-medium">📅 Date:</span> {event.date}
                </p>
                <p>
                  <span className="font-medium">⏰ Time:</span> {event.time}
                </p>
                <p>
                  <span className="font-medium">📍 Venue:</span> {event.venue}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
