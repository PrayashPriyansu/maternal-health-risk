"use client";

import {
  DropletsIcon,
  HeartPulseIcon,
  ThermometerIcon,
  GaugeIcon,
  ShieldAlertIcon,
} from "lucide-react";
import Card from "./_components/Card";
import { Button } from "@/components/ui/button";
import RiskResult from "@/components/riskResult";
import { useEffect, useState } from "react";

export interface RiskResult {
  prediction: "low risk" | "mid risk" | "high risk" | "not calculated";
  probability: number;
}

function Page() {
  const [age, setAge] = useState<number>(30);
  const [systolic, setSystolic] = useState<number>(120);
  const [diastolic, setDiastolic] = useState<number>(80);
  const [glucose, setGlucose] = useState<number>(7);
  const [temperature, setTemperature] = useState<number>(98);
  const [heartRate, setHeartRate] = useState<number>(76);
  const [score, setScore] = useState<RiskResult>({
    prediction: "not calculated",
    probability: 0,
  });
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const data = await fetch("http://127.0.0.1:8000/");

  // const result = await data.json();

  useEffect(
    function () {
      setScore({
        prediction: "not calculated",
        probability: 0,
      });
    },
    [age, systolic, diastolic, glucose, temperature, heartRate]
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-screen  flex justify-center items-center">
        <div className="size-10 animate-spin border-2 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://maternal-health-risk-backend.onrender.com/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Age: age,
            SystolicBP: systolic,
            DiastolicBP: diastolic,
            BS: glucose,
            BodyTemp: temperature,
            HeartRate: heartRate,
          }),
        }
      );
      const result = await response.json();
      setScore({
        prediction: result["Predicted Risk Level"],
        probability: result["Prediction Probability"],
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center my-10 min-h-screen text-center px-4">
      <h1 className="text-xl font-bold text-blue-950">
        Maternal Health Risk Assessment
      </h1>
      <p className="max-w-lg text-blue-800">
        Enter maternal health metrics below to assess potential
        pregnancy-related risks. This tool provides an initial evaluation but
        does not replace professional medical advice.
      </p>

      <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Maternal Age */}
        <Card
          value={age}
          setValue={setAge}
          icon={
            <ShieldAlertIcon className="size-7 bg-blue-500 rounded-full p-1 text-white" />
          }
          title="Maternal Age"
          description="Higher maternal age can increase pregnancy complications."
          unit="years"
          min={15}
          max={50}
        />

        {/* Systolic Blood Pressure */}
        <Card
          value={systolic}
          setValue={setSystolic}
          icon={
            <GaugeIcon className="size-7 bg-red-500 rounded-full p-1 text-white" />
          }
          title="Systolic Blood Pressure"
          description="Higher blood pressure may indicate risk of preeclampsia."
          unit="mm Hg"
          min={90}
          max={180}
        />

        {/* Diastolic Blood Pressure */}
        <Card
          value={diastolic}
          setValue={setDiastolic}
          icon={
            <GaugeIcon className="size-7 bg-orange-500 rounded-full p-1 text-white" />
          }
          title="Diastolic Blood Pressure"
          description="Elevated levels may indicate cardiovascular stress during pregnancy."
          unit="mm Hg"
          min={60}
          max={120}
        />

        {/* Blood Glucose Level */}
        <Card
          value={glucose}
          setValue={setGlucose}
          icon={
            <DropletsIcon className="size-7 bg-red-500 rounded-full p-1 text-white" />
          }
          title="Blood Sugar Level"
          description="Fasting blood sugar level measured in mmol/L."
          unit="mmol/L"
          min={2}
          max={20}
        />

        {/* Body Temperature (Celsius) */}
        <Card
          value={temperature}
          setValue={setTemperature}
          icon={
            <ThermometerIcon className="size-7 bg-yellow-500 rounded-full p-1 text-white" />
          }
          title="Body Temperature"
          description="Unusual temperatures can signal infection or fever risk."
          unit="°F"
          min={95}
          max={105}
        />

        {/* Heart Rate */}
        <Card
          value={heartRate}
          setValue={setHeartRate}
          icon={
            <HeartPulseIcon className="size-7 bg-pink-500 rounded-full p-1 text-white" />
          }
          title="Heart Rate"
          description="Changes in heart rate may indicate cardiovascular concerns."
          unit="bpm"
          min={40}
          max={140}
        />
      </div>
      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        size={"lg"}
        className={`relative mt-8 cursor-pointer ${
          isLoading
            ? "hover:scale-none"
            : "hover:scale-105 hover:bg-blue-600 active:scale-95"
        } transition-all duration-200 ease-in-out  bg-blue-500 text-white `}
      >
        {isLoading && (
          <span className="absolute left-1/2 top-1/2 -translate-1/2 rounded-full size-5 border-2 border-white border-t-transparent animate-spin"></span>
        )}
        <span
          className={`${
            isLoading ? "invisible pointer-events-none" : "visible"
          }`}
        >
          Calculate Risk
        </span>
      </Button>

      <RiskResult score={score} />
    </div>
  );
}

export default Page;
