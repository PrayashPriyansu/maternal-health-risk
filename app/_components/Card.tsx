"use client";
import { Slider } from "@/components/ui/slider";
import { ReactElement } from "react";

interface CardProps {
  icon: ReactElement;
  title: string;
  unit: string;
  min: number;
  max: number;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;

  description: string;
}

function Card({
  icon,
  title,
  value,
  setValue,
  description,
  unit,
  min,
  max,
}: CardProps) {
  function onChange(newValue: number[]) {
    setValue(newValue[0]);
  }
  return (
    <div className="flex flex-col  gap-4  bg-white rounded-t-lg shadow-md col-span-1">
      <div className="bg-violet-50 p-2 rounded-t-lg h-2/5">
        <div className="flex items-center gap-2">
          {icon}
          <h1 className="text-xl">{title}</h1>
        </div>
        <div className="flex items-center mt-2 text-left font-medium text-muted-foreground text-sm gap-4">
          {description}
        </div>
      </div>
      <div className="pt-1 pb-3 px-5 space-y-5">
        <div className="flex gap-4  flex-col items-start">
          <label htmlFor="value" className="text-lg">
            Value
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              id="value"
              onChange={(e) => setValue(parseInt(e.target.value))}
              min={min}
              max={max}
              readOnly
              value={value}
              contentEditable={false}
              name="value"
              className="w-52 p-2 text-lg bg-transparent/50 border-2 border-gray-300 rounded-lg"
            />
            <span className="font-semibold text-muted-foreground">{unit}</span>
          </div>
        </div>
        <div className="w-full">
          <Slider
            value={[value]}
            min={min}
            max={max}
            onValueChange={onChange}
            className="transition-all duration-100 ease-in-out text-blue-400 accent-amber-700"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
