"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

export default function PollsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [polls, setPolls] = useState([]);
  const [userSelections, setUserSelections] = useState({});

  // Fetch polls
  const fetchPolls = async () => {
    try {
      const res = await axios.get("http://localhost:5000/poll", {
        withCredentials: true,
      });
      setPolls(res.data.data); // ✅ contains alreadyVoted
    } catch (err) {
      console.error("Error fetching polls:", err);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  // Select option
  const handleSelect = (pollId, optionIndex) => {
    const poll = polls.find((p) => p._id === pollId);
    if (poll?.alreadyVoted) return; // ✅ don't allow if already voted
    setUserSelections((prev) => ({ ...prev, [pollId]: optionIndex }));
  };

  // Submit vote -> API call only
  const handleSubmit = async (pollId) => {
    const poll = polls.find((p) => p._id === pollId);
    if (poll?.alreadyVoted || userSelections[pollId] === undefined) return;

    try {
      await axios.post(
        `http://localhost:5000/poll/${pollId}`,
        { option: userSelections[pollId] },
        { withCredentials: true }
      );

      // ✅ update UI immediately
      setPolls((prev) =>
        prev.map((p) =>
          p._id === pollId ? { ...p, alreadyVoted: true } : p
        )
      );
    } catch (err) {
      console.error("Error submitting vote:", err);
    }
  };

  return (
    <div className="flex h-screen bg-slate-900">
      {sidebarOpen && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          mode="vault"
        />
      )}

      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header toggleSidebar={toggleSidebar} />

        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-white">📊 Active Polls</h1>

          <div className="grid md:grid-cols-2 gap-6">
            {polls.map((poll) => (
              <Card
                key={poll._id}
                className="p-5 bg-[#1f2a5c] border border-gray-700 text-white shadow-lg rounded-2xl"
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{poll.name}</span>
                    <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500">
                      Deadline:{" "}
                      {new Date(poll.deadline).toLocaleDateString("en-GB")}
                    </Badge>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  {poll.options.map((option, i) => {
                    const isSelected = userSelections[poll._id] === i;
                    const hasVoted = poll.alreadyVoted; // ✅ directly from backend

                    return (
                      <div
                        key={i}
                        className={`p-3 rounded-lg border transition cursor-pointer
                          ${
                            isSelected && !hasVoted
                              ? "bg-blue-600 border-blue-400 text-white"
                              : "bg-gradient-to-r from-[#47c0e8] via-[#3b82f6] to-[#6366f1] border-slate-600 hover:bg-slate-700 text-black"
                          }
                          ${hasVoted ? "opacity-70 cursor-not-allowed" : ""}
                        `}
                        onClick={() => handleSelect(poll._id, i)}
                      >
                        {option}
                      </div>
                    );
                  })}

                  <div className="pt-3">
                    <Button
                      className="w-full"
                      disabled={
                        poll.alreadyVoted ||
                        userSelections[poll._id] === undefined
                      }
                      onClick={() => handleSubmit(poll._id)}
                    >
                      {poll.alreadyVoted ? "Voted ✅" : "Submit Vote"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
