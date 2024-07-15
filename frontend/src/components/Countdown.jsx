import { useState, useEffect } from "react";

function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2024-08-19T08:30:00");
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference > 0) {
        const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
        );
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeRemaining({
          months,
          days,
          hours,
          minutes,
          seconds,
        });
      } else {
        setTimeRemaining({
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const styles = {
    countdown: {
      position: "absolute",
      zIndex: "199999",
      top: "10px",
      left: "10px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      padding: "10px",
      borderRadius: "8px",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "bold",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      border: "1px solid #ddd",
      padding: "8px",
      textAlign: "center",
    },
    td: {
      border: "1px solid #ddd",
      padding: "8px",
      textAlign: "center",
    },
  };

  return (
    <>
      <div style={styles.countdown}>
        <h3>Amount of Time Till My Summer Ends</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Months</th>
              <th>Days</th>
              <th>Hours</th>
              <th>Minutes</th>
              <th>Seconds</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{timeRemaining.months}</td>
              <td>{timeRemaining.days}</td>
              <td>{timeRemaining.hours}</td>
              <td>{timeRemaining.minutes}</td>
              <td>{timeRemaining.seconds}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Countdown;
