import React, { useEffect, useState } from "react";
import { getFromState, saveInState } from "../../utils/state";
import "./Timer.css";

const Timer: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const fetchEggData = async () => {
      const egg = await getFromState("gotchi");
      if (egg && egg.evolves) {
        const endTime = new Date(egg.evolves).getTime();
        const now = Date.now();
        const remaining = endTime - now;
        setTimeRemaining(Math.max(remaining, 0));

        if (remaining <= 0) {
          saveInState('timerFinished', true)
        }
      }
    };
    
    fetchEggData();

    const interval = setInterval(() => {
      fetchEggData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  if (timeRemaining !== null && timeRemaining <= 0) {
    return null;
  }

  return (
    <>
      <p className="timer">
        {timeRemaining !== null ? formatTime(timeRemaining) : "Cargando..."}
      </p>
    </>
  );
};

export default Timer;
