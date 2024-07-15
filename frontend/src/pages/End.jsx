import React, { useEffect, useState } from "react";
import Countdown from "../components/Countdown";
import Border from "../components/Border";

function End() {
  const [typeSummer, setTypeSummer] = useState(null);

  const handleRestart = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    fetch("http://localhost:5000/getData")
      .then((response) => response.json())
      .then((data) => {
        let week1 = data["decisions"][1];
        let week2 = data["decisions"][2];
        let week3 = data["decisions"][3];
        let week4 = data["decisions"][4];
        let finalType = `${week1}y-${week2}y-${week3}y-${week4}y`;

        setTypeSummer(finalType);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Border
      content={
        <>
          <Countdown />
          <div style={styles.container}>
            <h1>Well... I guess your summer ended.</h1>
            <h2>It's been a very {typeSummer} type of summer</h2>
            <h2>But you can restart if you want</h2>
            <button onClick={handleRestart} style={styles.button}>
              Restart
            </button>
          </div>
        </>
      }
    />
  );
}

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
    zIndex: "-1",
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
  },
};

export default End;
