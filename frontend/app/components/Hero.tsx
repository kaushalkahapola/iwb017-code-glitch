"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./Hero.css";

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "Swap Tasks, Build Communities";

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage after login
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserId(data.id);
        } else {
          console.error("Failed to fetch user ID");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Typing effect logic
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index += 1;
      if (index > fullText.length) {
        clearInterval(interval); // Stops once the text is fully typed
      }
    }, 100); // Adjust typing speed here (milliseconds per character)
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-green-100 px-4 md:px-6">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            {/* Text with typing animation */}
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-green-800">
              <span className="typing-text">{text}</span>
              <span className="blinking-cursor">|</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-green-700 md:text-xl animate-[pulse_4s_ease-in-out_infinite]">
              Join our local task exchange platform and connect with neighbors
              to share skills, save money, and strengthen your community.
            </p>
          </div>
          <div className="space-x-4">
            <Link
              href={userId ? `users/${userId}/profile` : "/register"}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-white shadow hover:bg-green-700 hover:shadow-lg h-9 px-4 py-2 transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
            <Link
              href="/learn-more"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50 border border-green-600 bg-white text-green-600 shadow-sm hover:bg-green-50 hover:shadow h-9 px-4 py-2 transform hover:-translate-y-0.5"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
