import React, { useEffect } from "react";

export default function Timer({ dispatch, timeLeft }) {
  const mins = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
