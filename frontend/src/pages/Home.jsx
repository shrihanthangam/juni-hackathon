import React, { useState, useEffect } from "react";

const Home = () => {
  const [backendWorking, setBackendWorking] = useState(false);
  const [backendError, setBackendError] = useState(false);

  const handleButtonClick = () => {
    window.location.href = "/week1";
  };

  useEffect(() => {
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
  }, []);

  return (
    <div style={styles.container}>
      <h1>Welcome to the Home Page</h1>
      <p>{backendWorking ? "Backend Working!" : "Backend Loading..."}</p>
      <p style={{ color: "red" }}>
        {backendError
          ? "Backend Error! Try rerunning the backend, or look in the console for more information! Reload when you think you fixed it!"
          : ""}
      </p>
      <button
        onClick={handleButtonClick}
        style={styles.button}
        disabled={backendWorking ? false : true}
      >
        Go to Week 1
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
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

export default Home;
