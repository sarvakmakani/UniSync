"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PollsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Example Polls (replace with API later)
  const [polls, setPolls] = useState([
    {
      id: 1,
      question: "Do you want an offline workshop next week?",
      options: ["Yes", "No", "Maybe","Not Sure"],
      votes: [5, 2, 1,0],
      deadline: "2025-08-30",
      status: "Active",
    },
    {
      id: 2,
      question: "Which programming language should be taught next?",
      options: ["Python", "Java", "C++", "JavaScript"],
      votes: [10, 3, 2, 6],
      deadline: "2025-09-05",
      status: "Active",
    },
  ]);

  const [userSelections, setUserSelections] = useState({});
  const [userVotes, setUserVotes] = useState({});

  const handleSelect = (pollId, optionIndex) => {
    if (userVotes[pollId] !== undefined) return; // already voted
    setUserSelections((prev) => ({ ...prev, [pollId]: optionIndex }));
  };

  const handleSubmit = (pollId) => {
    if (userVotes[pollId] !== undefined || userSelections[pollId] === undefined)
      return;

    const optionIndex = userSelections[pollId];
    setPolls((prev) =>
      prev.map((poll) =>
        poll.id === pollId
          ? {
              ...poll,
              votes: poll.votes.map((v, i) =>
                i === optionIndex ? v + 1 : v
              ),
            }
          : poll
      )
    );

    setUserVotes((prev) => ({ ...prev, [pollId]: optionIndex }));
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
            {polls.map((poll) => {
              const totalVotes = poll.votes.reduce((a, b) => a + b, 0);

              return (
                <Card
                  key={poll.id}
                  className="p-5 bg-[#1f2a5c] border border-gray-700 text-white shadow-lg rounded-2xl"
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{poll.question}</span>
                      <Badge
                        className="bg-blue-500/20 text-blue-300 border border-blue-500"
                      >
                        Deadline: {poll.deadline}
                      </Badge>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {poll.options.map((option, i) => {
                      const percentage =
                        totalVotes === 0
                          ? 0
                          : Math.round((poll.votes[i] / totalVotes) * 100);

                      const isSelected = userSelections[poll.id] === i;
                      const hasVoted = userVotes[poll.id] !== undefined;

                      return (
                        <div
                          key={i}
                          className={`p-3 rounded-lg border transition cursor-pointer flex justify-between items-center
                            ${
                              isSelected && !hasVoted
                                ? "bg-blue-600 border-blue-400 text-white"
                                : "bg-gradient-to-r from-[#47c0e8] via-[#3b82f6] to-[#6366f1] border-slate-600 hover:bg-slate-700 text-black"
                            }
                            ${hasVoted ? "opacity-70 cursor-not-allowed" : ""}
                          `}
                          onClick={() => handleSelect(poll.id, i)}
                        >
                          <span>{option}</span>
                          {hasVoted && (
                            <span className="text-sm text-gray-300">
                              {poll.votes[i]} votes ({percentage}%)
                            </span>
                          )}
                        </div>
                      );
                    })}

                    {/* Submit button */}
                    <div className="pt-3">
                      <Button
                        className="w-full"
                        disabled={
                          userVotes[poll.id] !== undefined ||
                          userSelections[poll.id] === undefined
                        }
                        onClick={() => handleSubmit(poll.id)}
                      >
                        {userVotes[poll.id] !== undefined
                          ? "Voted ✅"
                          : "Submit Vote"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
