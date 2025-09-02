"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Login() {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const toggleSidebar = () => setSidebarOpen((prev) => !prev);

	return (
		<div className="flex h-screen">
			
		</div>
	);
}

