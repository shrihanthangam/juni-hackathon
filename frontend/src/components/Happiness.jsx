import { useState, useEffect } from "react";

import "../static/css/Happiness.css";

function Happiness() {
  const [happiness, setHappiness] = useState(0);
  const [happinessClass, setHappinessClass] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/getData")
      .then((response) => response.json())
      .then((data) => {
        for (const [key, value] of Object.entries(data)) {
          if (key === "happiness") {
            setHappiness(value * 10);
            if (value * 10 <= 33.3) {
              setHappinessClass("low");
            } else if (value * 10 <= 66.6) {
              setHappinessClass("medium");
            } else {
              setHappinessClass("high");
            }

            break;
          }
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <>
      <p id="happiness-title" style={{ right: "12%", top: "1%" }}>
        Happiness
      </p>
      <div
        className="happiness-container"
        style={{ top: "6%", right: "2%", width: "30%" }}
      >
        <div
          className={`happiness-bar ${happinessClass}`}
          id="happiness-bar"
          style={{ width: `${happiness}%` }}
        ></div>
      </div>
    </>
  );
}

export default Happiness;
