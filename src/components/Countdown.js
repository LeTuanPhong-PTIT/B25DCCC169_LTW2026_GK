import { useEffect, useState } from "react";

const calculateRemaining = (date) => {
  const targetTime = new Date(`${date}T00:00:00`).getTime();
  const difference = targetTime - Date.now();

  if (difference <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
};

const Countdown = ({ date }) => {
  const [remaining, setRemaining] = useState(() => calculateRemaining(date));

  useEffect(() => {
    setRemaining(calculateRemaining(date));
    const intervalId = setInterval(() => {
      setRemaining(calculateRemaining(date));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [date]);

  if (remaining === null) {
    return <p className="countdown">Sự kiện đã diễn ra.</p>;
  }

  const { days, hours, minutes, seconds } = remaining;

  return (
    <p className="countdown">
      Còn {days} ngày {hours} giờ {minutes} phút {seconds} giây
    </p>
  );
};

export default Countdown;
