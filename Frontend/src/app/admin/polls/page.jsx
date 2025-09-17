"use client";
import React, { useState } from "react";
import PollOption from "@/components/PollOption";
import PollCard from "@/components/PollCard";

export default function FacultyPolls() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [polls, setPolls] = useState([]);
  const [faculty] = useState("Prof. John Doe");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => options.length < 4 && setOptions([...options, ""]);
  const removeOption = (index) => options.length > 2 && setOptions(options.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPoll = {
      id: Date.now(),
      question,
      options: options.map((text) => ({ text, votes: 0 })),
      createdBy: faculty,
      createdAt: new Date().toISOString(),
    };
    setPolls([newPoll, ...polls]);
    setQuestion("");
    setOptions(["", ""]);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Poll Creation Form */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl mb-6">
          <h1 className="text-3xl font-bold text-[#47c0e8] mb-4 text-center">Create Poll</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Poll Question"
              className="p-3 rounded-xl bg-slate-700 text-gray-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#47c0e8]"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />

            {options.map((opt, i) => (
              <PollOption
                key={i}
                value={opt}
                onChange={(val) => handleOptionChange(i, val)}
                onRemove={() => removeOption(i)}
                showRemove={options.length > 2}
              />
            ))}

            {options.length < 4 && (
              <button
                type="button"
                onClick={addOption}
                className="bg-[#47c0e8] px-4 py-2 rounded-xl hover:bg-[#36a1c1] text-black font-semibold"
              >
                Add Option
              </button>
            )}

            <button
              type="submit"
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 rounded-xl hover:opacity-90 transition"
            >
              Post Poll
            </button>
          </form>
        </div>

        {/* Poll Preview & Previous Polls */}
        {polls.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {polls.map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
