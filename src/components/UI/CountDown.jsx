import React, { useEffect, useState } from "react";

function CountDown({ item }) {
  const [formattedDate, setFormattedDate] = useState(null);

  function formatTime(time) {
    const timeLeftMs = time - Date.now();

    if (timeLeftMs <= 0) {
      return "EXPIRED";
    }

    const totalSeconds = Math.floor(timeLeftMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
        if(item.expiryDate) {
            setFormattedDate(formatTime(item.expiryDate));
        } //one second interval with updated time for countdown timer
    }, 1000);
    return () => clearInterval(intervalId);
  }, [formattedDate]);

  return (
    <>
      {formattedDate && (
        <div className="de_countdown">{formattedDate}</div>
      )}
    </>
  );
}

export default CountDown;
