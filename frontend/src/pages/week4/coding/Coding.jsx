import React, { useState, useEffect } from "react";
import axios from "axios";

import Border from "../../../components/Border";
import Happiness from "../../../components/Happiness";
import Notification from "../../../components/Notification";
import "./Coding.css";

function Coding() {
  const [startUp, setStartUp] = useState(true);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [passed, setPassed] = useState(false);

  const instructions =
    "Make a function IN PYTHON called fibonacci(x), this function finds the number xth number in the fibonacci sequence (x is the input of the function!) ex. fibonacci(1) = 0, fibonacci(2) = 1, fibonacci(3) = 1, etc.";

  const startCoding = () => {
    setStartUp(false);
  };

  useEffect(() => {
    let happiness = 0;
    fetch("http://localhost:5000/getData")
      .then((response) => response.json())
      .then((data) => {
        happiness = data["happiness"];
        let week4Exists = data["decisions"][4];
        console.log(happiness, week4Exists);

        if (week4Exists === "") {
          try {
            const response = axios.put("http://localhost:5000/updateData", {
              happiness: Math.min((happiness += 2), 10),
              decisions: {
                4: "coding",
              },
            });
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log("it already exists!");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const runCode = async () => {
    const response = await fetch("http://127.0.0.1:5000/run_code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    const result = await response.json();
    setOutput(result.output);
    if (result.passed) {
      setPassed(true);
    }
  };

  /*
  def fibonacci(x):
    if x == 1:
        return 0
    if x <= 3:
        return 1
    
    return fibonacci(x-1) + fibonacci(x-2)
  */
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const spaces = "    "; // 4 spaces
      const newCode =
        code.substring(0, selectionStart) +
        spaces +
        code.substring(selectionEnd);

      setCode(newCode);
      // Optionally, move the cursor position after the inserted spaces
      e.target.selectionStart = e.target.selectionEnd =
        selectionStart + spaces.length;
    }
  };

  return (
    <>
      <Border
        content={
          <>
            <Happiness />
            <Notification text={"You decided to code!"} />
            <p
              className="passed"
              style={{ display: `${passed ? "block" : "none"}` }}
            >
              Wow you passed all the tests!
            </p>
            <p
              className="side-text"
              style={{ display: `${startUp ? "none" : "block"}` }}
            >
              <b>Instructions:</b> {instructions}
            </p>
            <div className="startup" style={{ opacity: `${startUp ? 1 : 0}` }}>
              <p id="name">Start Coding!</p>
              <p id="instructions">
                <b>Instructions:</b> {instructions}
              </p>
              <p id="objective">
                <b>Objective:</b> Finish before the timer runs out!
              </p>
              <button id="startup-button" onClick={startCoding}>
                Start Coding!
              </button>
            </div>
            <div
              className="coding"
              style={{ display: `${startUp ? "none" : "block"}` }}
            >
              <textarea
                className="code-input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown} // Add the handleKeyDown function here
                rows="10"
                cols="50"
              ></textarea>
              <br />
              <button className="run-button" onClick={runCode}>
                Run Code
              </button>
              <div>
                <h3>Output:</h3>
                <pre>{output}</pre>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}

export default Coding;
