"use client";

import { useState, useEffect } from 'react';
import SEQUENCES from '@/mock/sequences';
import { IoClose } from "react-icons/io5";
import { IoPlayCircleOutline } from "react-icons/io5";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { IoExpandOutline } from "react-icons/io5";

export default function TileSequence() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sequences, setSequences] = useState(SEQUENCES);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < sequences.length - 1 ? prev + 1 : prev));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle tile click
  const handleTileClick = (index) => {
    if (index < currentIndex) {
      handlePrev();
    } else if (index > currentIndex) {
      handleNext();
    }
  };

  const handleRemoveTile = (e, index) => {
    e.stopPropagation(); // Prevent tile click event
    const newSequences = sequences.filter((_, i) => i !== index);
    setSequences(newSequences);
    if (currentIndex >= index && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handlePreview = () => {
    console.log("clicked preview")
    setIsPreviewPlaying(true);
    // Auto close after 5 seconds
    setTimeout(() => {
      setIsPreviewPlaying(false);
    }, 5000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Preview Video Overlay */}
      {isPreviewPlaying && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-[800px] h-[450px] bg-gray-800/80 rounded-xl overflow-hidden backdrop-blur-sm">
            {/* Mock video content */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-800/20">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-indigo-500/50 border-t-indigo-200 rounded-full animate-spin mb-4" />
                <div className="text-indigo-200 text-xl font-medium">Generating preview...</div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsPreviewPlaying(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-black/30 hover:bg-black/50
                       text-gray-300 hover:text-white transition-all duration-200"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className={`absolute left-8 z-10 p-4 rounded-full 
                   bg-gray-800/50 backdrop-blur-sm
                   transition-all duration-300 ease-in-out
                   ${currentIndex === 0
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-700/50 hover:scale-110'}`}
      >
        <IoChevronBack className="w-8 h-8 text-gray-300" />
      </button>

      <div className="flex flex-col items-center">
        {/* Tiles Container */}
        <div className="relative flex items-center justify-center mb-20">
          {sequences.map((tile, index) => {
            const position = index - currentIndex;
            const isVisible = Math.abs(position) <= 2;

            return isVisible && (
              <div
                key={tile.id}
                onClick={() => handleTileClick(index)}
                className={`absolute transition-all duration-500 ease-in-out 
                           ${position !== 0 ? 'cursor-pointer hover:scale-105' : ''}`}
                style={{
                  transform: `translateX(${position * 140}%) scale(${position === 0 ? 1 : position === 1 || position === -1 ? 0.75 : 0.5})`,
                  opacity: position === 0 ? 1 : position === 1 || position === -1 ? 0.4 : 0.2,
                  zIndex: 10 - Math.abs(position)
                }}
              >
                {/* Floating title - only visible for current tile */}
                {position === 0 && (
                  <div className="absolute -top-16 left-0 right-0 text-center
                                transform transition-all duration-500 ease-in-out">
                    <h3 className="text-4xl font-bold text-indigo-200 tracking-wide">
                      {tile.title}
                    </h3>
                  </div>
                )}

                <div className={`group relative w-96 h-96 bg-gray-800/80 backdrop-blur-sm
                              border-4 ${position === 0 ? 'border-blue-500/50' : 'border-gray-700/50'} rounded-2xl
                              flex flex-col
                              shadow-2xl shadow-black/50
                              transition-all duration-300
                              ${position !== 0 ? 'hover:border-gray-600/50' : ''}`}>

                  {/* Hover Controls - only show on hover */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {/* Remove Button */}
                    <button
                      onClick={(e) => handleRemoveTile(e, index)}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 
                               backdrop-blur-sm transition-all duration-200
                               text-red-300 hover:text-red-200"
                    >
                      <IoClose className="w-5 h-5" />
                    </button>

                    {/* Expand Button */}
                    <button
                      className="p-2 rounded-lg bg-gray-500/20 hover:bg-gray-500/40 
                               backdrop-blur-sm transition-all duration-200
                               text-gray-300 hover:text-gray-200"
                    >
                      <IoExpandOutline className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Image section */}
                  <div className="w-full h-2/3 bg-gray-700/50 rounded-t-xl">
                    {tile.imageUrl && (
                      <img
                        src={tile.imageUrl}
                        alt={tile.title}
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    )}
                  </div>

                  {/* Scrollable script section */}
                  <div className="w-full h-1/3 p-4">
                    <textarea
                      value={tile.script}
                      onChange={(e) => {
                        const updatedSequences = [...sequences];
                        updatedSequences[index] = {
                          ...tile,
                          script: e.target.value
                        };
                        setSequences(updatedSequences);
                      }}
                      className="w-full h-full resize-none rounded-lg
                               bg-gray-900/50 text-gray-300
                               p-3 text-sm leading-relaxed
                               scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent
                               focus:outline-none focus:ring-1 focus:ring-indigo-500
                               placeholder:text-gray-600"
                      placeholder="Enter your script here..."
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Preview Button */}
        <div className={`
          absolute
          w-full
          flex justify-center items-center
          transform translate-y-[14rem]
          transition-all duration-300 ease-in-out
          ${currentIndex === sequences.findIndex(s => s.id === sequences[currentIndex]?.id)
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'}
        `}>
          <button
            onClick={handlePreview}
            disabled={isPreviewPlaying}
            className={`
              w-auto h-auto
              px-6 py-3 rounded-xl 
              flex items-center gap-2
              backdrop-blur-sm shadow-lg
              transition-all duration-300 ease-in-out
              ${isPreviewPlaying
                ? 'bg-gray-500/20 text-gray-500 cursor-not-allowed border-gray-600/50'
                : 'bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-500/50 hover:border-indigo-400/50 text-indigo-300 hover:text-indigo-200'}
            `}
          >
            <IoPlayCircleOutline className="w-5 h-5" />
            {isPreviewPlaying ? 'Generating...' : 'Preview Scene'}
          </button>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentIndex === sequences.length - 1}
        className={`absolute right-8 z-10 p-4 rounded-full 
                   bg-gray-800/50 backdrop-blur-sm
                   transition-all duration-300 ease-in-out
                   ${currentIndex === sequences.length - 1
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-700/50 hover:scale-110'}`}
      >
        <IoChevronForward className="w-8 h-8 text-gray-300" />
      </button>
    </div>
  );
} 
