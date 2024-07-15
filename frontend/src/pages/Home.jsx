import React, { useState, useEffect } from "react";
import Border from "../components/Border";
import Countdown from "../components/Countdown";

const Home = () => {
  const [backendWorking, setBackendWorking] = useState(false);
  const [backendError, setBackendError] = useState(false);

  const handleButtonClick = () => {
    window.location.href = "/week1";
  };

  useEffect(() => {
    setInterval(() => {
      console.log("rerun");
      fetch("http://localhost:5000/getData")
        .then((response) => response.json())
        .then((data) => {
          if (data["happiness"]) {
            setBackendWorking(true);
            console.log(data["happiness"]);
          }
        })
        .catch((e) => {
          console.error(e);
          setBackendError(true);
        });
    }, 100);
  }, []);

  return (
    <Border
      content={
        <>
          <div style={styles.container}>
            <div style={styles.sun}></div>
            <Countdown />
            <h1>Welcome to My Summer!</h1>
            <p>{backendWorking ? "Backend Working!" : "Backend Loading..."}</p>
            <p style={{ color: "red" }}>
              {backendError
                ? "Backend Error! Try rerunning the backend, or look in the console for more information! Reload when you think you fixed it!"
                : ""}
            </p>
            <button
              onClick={handleButtonClick}
              style={styles.button}
              disabled={!backendWorking}
            >
              Start the Game!
            </button>
          </div>
        </>
      }
    />
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderRadius: "15px",
    background: "linear-gradient(to bottom, #87CEFA, #f0e68c)", // Sky to light yellow gradient
    position: "relative",
  },
  sun: {
    width: "100px",
    height: "100px",
    backgroundImage: `url("/pngs/sun.png")`,
    backgroundSize: "cover",
    position: "absolute",
    top: "10%",
    right: "10%",
  },
  countdown: {
    position: "absolute",
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
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default Home;
