"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

export default function FormsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Dummy forms data (later replace with backend API)
  const forms = [
    {
      id: 1,
      title: "Bonafide Certificate Request",
      description: "Apply for a bonafide certificate issued by the university.",
      status: "Pending",
      deadline: "2025-09-10",
    },
    {
      id: 2,
      title: "Leave Application Form",
      description: "Submit leave request for academic or personal reasons.",
      status: "Filled",
      deadline: "2025-09-05",
    },
    {
      id: 3,
      title: "Hostel Accommodation Form",
      description: "Apply for hostel room allocation or change.",
      status: "Pending",
      deadline: "2025-09-15",
    },
  ];

  // Status → Badge color mapping
const statusColor = {
//   Pending: "bg-yellow-500/20 text-yellow-400 border border-yellow-500",
  Filled: "bg-green-500/20 text-green-400 border border-green-500",
  Pending: "bg-red-500/20 text-red-400 border border-red-500",
};


  return (
    <div className="flex h-screen">
      {sidebarOpen && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          mode="vault"
        />
      )}
      <div className="flex-1 flex bg-slate-900 flex-col overflow-y-auto">
        <Header toggleSidebar={toggleSidebar} />

        <div className="p-6 text-white">
          <h1 className="text-2xl font-bold mb-6">📄 Available Forms</h1>

          {/* Forms Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <Card
                key={form.id}
                className="bg-[#1f2a5c] border border-gray-700 shadow-md hover:shadow-lg transition rounded-2xl"
              >
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-white">
                    {form.title}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={`${statusColor[form.status]} rounded-full px-3 py-1 text-xs font-medium`}
                  >
                    {form.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mb-4">
                    {form.description}
                  </p>

                  <div className="flex items-center text-gray-300 text-sm mb-4">
                    <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                    Deadline:{" "}
                    <span className="ml-1 text-gray-200 font-medium">
                      {form.deadline}
                    </span>
                  </div>

                  <Button className="w-full">Fill Form</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
