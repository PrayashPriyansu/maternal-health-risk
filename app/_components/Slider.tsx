"use client";

import { useState, useRef } from "react";

interface SliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (newValue: number) => void;
}

function Slider({ value, min, max, onChange }: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) * 100) / (max - min);

  /** Function to update slider value based on mouse/touch position */
  const updateValue = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let newPercentage = ((clientX - rect.left) / rect.width) * 100;
    newPercentage = Math.max(0, Math.min(100, newPercentage)); // Keep in bounds
    const newValue = Math.round(min + (newPercentage / 100) * (max - min));
    onChange(newValue);
  };

  /** Mouse & Touch Handlers */
  const handlePointerMove = (event: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    updateValue(clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handlePointerMove);
    document.removeEventListener("mouseup", handlePointerUp);
    document.removeEventListener("touchmove", handlePointerMove);
    document.removeEventListener("touchend", handlePointerUp);
  };

  const handlePointerDown = (event: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    updateValue(clientX);
    document.addEventListener("mousemove", handlePointerMove);
    document.addEventListener("mouseup", handlePointerUp);
    document.addEventListener("touchmove", handlePointerMove);
    document.addEventListener("touchend", handlePointerUp);
  };

  return (
    <div className="w-full">
      {/* Slider Track */}
      <div
        ref={sliderRef}
        className="relative w-full h-3 bg-blue-100 rounded-md"
      >
        {/* Progress Bar */}
        <div
          className="h-full bg-blue-400 rounded-md"
          style={{ width: `${percentage}%` }}
        ></div>

        {/* Slider Knob */}
        <div
          className="w-5 h-5 hover:scale-105 bg-blue-600 rounded-full absolute top-1/2 -translate-y-1/2 cursor-pointer"
          style={{ left: `calc(${percentage}% - 10px)` }}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
        ></div>
      </div>

      {/* Min & Max Labels */}
      <div className="p-2 flex justify-between">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default Slider;
