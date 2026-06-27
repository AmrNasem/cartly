"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const PLACEHOLDER_TIME: TimeLeft = {
  days: 2,
  hours: 14,
  minutes: 35,
  seconds: 52,
};

function calculateTimeLeft(endDate: Date): TimeLeft | null {
  const difference = endDate.getTime() - Date.now();

  if (difference <= 0) return null;

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

type FlashDealsCountdownProps = {
  /** When provided, the timer counts down to this date. Omit for placeholder display. */
  endDate?: Date;
};

function FlashDealsCountdown({ endDate }: FlashDealsCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    endDate ? (calculateTimeLeft(endDate) ?? PLACEHOLDER_TIME) : PLACEHOLDER_TIME,
  );

  useEffect(() => {
    if (!endDate) return;

    const tick = () => {
      const next = calculateTimeLeft(endDate);
      setTimeLeft(next ?? PLACEHOLDER_TIME);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div
      className="flex items-center gap-2"
      role="timer"
      aria-label="Flash deals countdown timer"
    >
      {units.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="flex size-12 items-center justify-center rounded-lg bg-primary text-white text-lg font-bold tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wide">
              {unit.label}
            </span>
          </div>
          {index < units.length - 1 && (
            <span className="text-primary font-bold text-lg mb-4">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default FlashDealsCountdown;
