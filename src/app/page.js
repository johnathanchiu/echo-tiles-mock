"use client";

import { useState } from 'react';
import Image from 'next/image';
import AgentChat from "@/components/AgentChat";
import TileSequence from "@/components/TileSequence";

export default function Home() {
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (text) => {
    setIsAnimating(true);
    console.log(text);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 overflow-hidden">
      {/* Logo */}
      <div className="absolute top-8 left-8 z-50">
        <Image
          src="https://app.ashbyhq.com/api/images/org-theme-logo/e8c22dbe-4bff-47b3-85f7-b62c3e2a4e3e/f427b738-c893-4f7c-afc3-0ca001f57878.png"
          alt="Company Logo"
          width={120}
          height={40}
          className="hover:opacity-90 transition-opacity cursor-pointer invert"
          priority
        />
      </div>

      {/* Tiles Section */}
      <div className={`
        absolute inset-0 flex items-center justify-center
        transition-all duration-700 ease-in-out
        ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
      `}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/80 pointer-events-none" />
        <TileSequence />
      </div>

      {/* Chat Section */}
      <div className={`
        absolute w-full z-10
        transition-all duration-700 ease-in-out
        ${isAnimating ? 'bottom-8' : 'top-1/2 -translate-y-1/2'}
      `}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className={`
            text-4xl font-bold bg-gradient-to-r from-indigo-200 via-sky-200 to-indigo-200 
            bg-clip-text text-transparent mb-8 text-center
            transition-all duration-700
            ${isAnimating ? 'opacity-0' : 'opacity-100'}
          `}>
            Echo Agent
          </h1>
          <AgentChat
            message={message}
            setMessage={setMessage}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}


