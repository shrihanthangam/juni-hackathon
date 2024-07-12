import React, { useState, useEffect } from "react";
import axios from "axios";

import Border from "../../../components/Border";
import Happiness from "../../../components/Happiness";
import Notification from "../../../components/Notification";
import GoToWeek from "../../../components/GoToWeek";

import "./Coding.css";

function Coding() {
  const [startUp, setStartUp] = useState(true);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [passed, setPassed] = useState(false);
  const [angry, setAngry] = useState(false);
  const [angryAmount, setAngryAmount] = useState(0);
  const [angryText, setAngryText] = useState("");
  const [color, setColor] = useState("black");
  const [week2Visible, setWeek2Visible] = useState(false);

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
      setWeek2Visible(true);
      setColor("green");
    } else {
      setAngry(true);
      setColor("red");
      if (angryAmount == 0) {
        setTimeout(() => {
          animateText(
            "Good job you failed! You better not fail again... or else!",
            175,
            setAngryText,
            () => {
              setTimeout(() => {
                setAngry(false);
                setAngryText("");
              }, 1500);
            }
          );
        }, 6000);
      }
      if (angryAmount == 1) {
        setTimeout(() => {
          animateText(
            "wow! again. I already gave you a warning.\nYou know what you should just procrastinate.",
            150,
            setAngryText,
            () => {
              setTimeout(() => {
                setAngry(false);
                setTimeout(() => {
                  setAngryText("");
                  setTimeout(() => {
                    window.location.href = "/week4/procrastinate";
                  }, 1500);
                }, 3000);
              }, 1500);
            }
          );
        }, 6000);
      }
      setAngryAmount((prev) => prev + 1);
    }
  };

  const animateText = (text, waitTime, settingFunction, callback) => {
    let counter = 0;
    const interval = setInterval(() => {
      if (counter >= text.length) {
        settingFunction(text); // Set full text when animation completes
        clearInterval(interval); // Clear interval
        if (callback) {
          callback();
        }
        // finished(true);
      } else {
        settingFunction(text.substring(0, counter) + " |"); // Update curString progressively
        console.log(text.substring(0, counter + " |"));
        counter += 1;
      }
    }, waitTime);

    return () => clearInterval(interval); // Cleanup interval on component unmount
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
            <GoToWeek weekNumber={5} opacity={week4Visible ? 1 : 0} />
            <Happiness />
            <Notification text={"You decided to code!"} />
            <p
              className="passed"
              style={{
                display: `${passed ? "block" : "none"}`,
                color: { color },
              }}
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
              <button
                className="run-button"
                onClick={runCode}
                disabled={true ? angry : false}
              >
                Run Code
              </button>
              <div>
                <h3>Output:</h3>
                <pre style={{ color: color }}>{output}</pre>
              </div>
            </div>
            <p
              id="angry"
              style={{
                fontSize: `${angry ? 400 : 0}px`,
              }}
            >
              😡
            </p>
            <p id="angry-text">{angryText}</p>
          </>
        }
      />
    </>
  );
}

export default Coding;
