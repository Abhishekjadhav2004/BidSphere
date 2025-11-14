import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    });
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <>
      <Link
        to={`/auction/item/${id}`}
        className="block bg-white/80 rounded-xl shadow-lg group hover:scale-105 hover:shadow-2xl focus:ring-2 focus:ring-[#d6482b] transition-all duration-200 overflow-hidden relative"
        style={{ minHeight: 320 }}
      >
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-48 object-cover rounded-t-xl border-b border-[#f6d4b5]"
        />
        <div className="px-5 pt-4 pb-4">
          <h5 className="font-bold text-lg group-hover:text-[#d6482b] mb-2 text-gray-900">{title}</h5>
          {startingBid && (
            <p className="text-gray-600 font-light">
              Starting Bid:
              <span className="text-[#fdba88] font-bold ml-1">{startingBid}</span>
            </p>
          )}
          <p className="mt-2 flex gap-2 items-center">
            {timeLeft.type && (
              <span className="bg-gradient-to-r from-[#fdba88] via-[#fbbe7d] to-[#d6482b] text-white rounded-full px-3 py-1 text-xs font-medium animate-pulse">{timeLeft.type}</span>
            )}
            {Object.keys(timeLeft).length > 1 ? (
              <span className="text-[#d6482b] font-bold ml-1 tracking-wider animate-fade-in">
                {formatTimeLeft(timeLeft)}
              </span>
            ) : (
              <span className="text-[#d6482b] font-bold ml-1">Time's up!</span>
            )}
          </p>
        </div>
      </Link>
    </>
  );
};

export default Card;
