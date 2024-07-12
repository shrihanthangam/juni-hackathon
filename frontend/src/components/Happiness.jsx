import { useState, useEffect } from "react";
import "../static/css/Happiness.css";

function Happiness() {
  const [happiness, setHappiness] = useState(0);
  const [happinessClass, setHappinessClass] = useState("low");

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5000/getData")
        .then((response) => response.json())
        .then((data) => {
          let curHappiness = data["happiness"];
          setHappiness(curHappiness * 10); // Assuming curHappiness is between 0 and 10
          if (curHappiness <= 3.33) {
            setHappinessClass("low");
          } else if (curHappiness <= 6.66) {
            setHappinessClass("medium");
          } else {
            setHappinessClass("high");
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 1000); // Fetch every second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="happiness-wrapper">
      <p id="happiness-title">Happiness</p>
      <div className="happiness-container">
        <div
          className={`happiness-bar ${happinessClass}`}
          style={{ width: `${happiness}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Happiness;
