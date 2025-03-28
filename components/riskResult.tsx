"use client";

import { RiskResult } from "@/app/page";
import { Info } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface RiskAssessmentProps {
  score: RiskResult;
}

export default function RiskAssessment({ score }: RiskAssessmentProps) {
  const prediction = score?.prediction ?? "Not Calculated";
  const probability = score?.probability ?? 0;

  let badgeStyle = "bg-gray-300 text-gray-600";
  if (prediction === "low risk") {
    badgeStyle = "bg-green-500 text-white";
  } else if (prediction === "mid risk") {
    badgeStyle = "bg-yellow-500 text-white";
  } else if (prediction === "high risk") {
    badgeStyle = "bg-red-500 text-white";
  }

  const progressColor = "#888888";
  // if (prediction === "low risk") {
  //   progressColor = "#22c55e";
  // } else if (prediction === "mid risk") {
  //   progressColor = "#eab308";
  // } else if (prediction === "high risk") {
  //   progressColor = "#ef4444";
  // }

  return (
    <div className="w-full p-5 grid grid-cols-1 md:grid-cols-2 mt-5 bg-white rounded-lg shadow-lg">
      <div className="flex items-center pb-3 md:pb-0 justify-center border-b-2 md:border-b-0  md:border-r-2">
        <div>
          <h2 className="text-2xl font-semibold text-center">
            Risk Assessment
          </h2>
          <p className="text-gray-500 text-center">
            Based on your health metrics
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-3 md:mt-0 space-y-5">
        <div className="md:flex md:gap-10">
          <div className="flex items-center justify-center mb-4 ">
            <Info className="w-6 h-6 text-gray-400" />
            <span
              className={`ml-2 px-4 py-1 rounded-full ${badgeStyle} text-lg font-medium`}
            >
              {prediction}
            </span>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-32 h-32">
              <CircularProgressbar
                value={probability * 100}
                text={`${Math.floor(probability * 100)}%`}
                styles={buildStyles({
                  pathColor: progressColor,
                  textColor: "#333",
                  trailColor: "#d6d6d6",
                })}
              />
            </div>
          </div>
        </div>

        {prediction.toLowerCase() === "not calculated" && (
          <div className="mt-4 p-3 text-sm text-gray-600 bg-gray-100 rounded-lg">
            Please enter your health metrics to calculate the risk level.
          </div>
        )}
      </div>
    </div>
  );
}
