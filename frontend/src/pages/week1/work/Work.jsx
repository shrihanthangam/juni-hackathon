import axios from "axios";
import React, { useEffect, useState } from "react";
import getAllWords from "../../../API/words";

import Window from "../../../components/Window";
import Border from "../../../components/Border";
import Computer from "../../../components/Computer";
import Notification from "../../../components/Notification";
import ProgressBar from "../../../components/ProgressBar";
import Submit from "../../../components/Submit";
import Popup from "../../../components/Popup";
import Happiness from "../../../components/Happiness";
import GoToWeek from "../../../components/GoToWeek";
import Countdown from "../../../components/Countdown";

import "./Work.css";

function Work() {
  const [curString, setCurString] = useState("");
  const [angry, setAngry] = useState(false);
  const [angryAmount, setAngryAmount] = useState(0);
  const [angryText, setAngryText] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [week2Visible, setWeek2Visible] = useState(false);
  const [searchComplete, setSearchComplete] = useState();
  const [allWords, setAllWords] = useState([]);

  const WORD_MINIMUM = 50;

  useEffect(() => {
    setAllWords(getAllWords());
  }, []);

  useEffect(() => {
    async function updateData() {
      try {
        await axios.post("http://localhost:5000/changeData", {
          happiness: 6,
          decisions: {
            1: "work",
            2: "",
            3: "",
            4: "",
          },
        });
        console.log("Data updated successfully");
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
    updateData();
  }, []);

  const animateText = (text, waitTime, settingFunction, callback) => {
    let counter = 0;
    const interval = setInterval(() => {
      if (counter >= text.length) {
        settingFunction(text); // Set full text when animation completes
        clearInterval(interval); // Clear interval
        if (callback) {
          callback();
        }
      } else {
        settingFunction(text.substring(0, counter) + " |"); // Update curString progressively
        console.log(counter, text.substring(0, counter));
        counter += 1;
      }
    }, waitTime);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  };

  const temp2 = () => {
    setTimeout(() => {
      setAngry(false);
      setAngryText("");
    }, 1000);
  };

  const temp = () => {
    setTimeout(() => {
      animateText(
        "I'll give you 1 more chance... but if you mess up",
        150,
        setAngryText,
        temp2
      );
    }, 1500);
  };

  const angryFunc = (cause) => {
    setAngryAmount((prev) => prev + 1);
    console.log(angryAmount);
    console.log("ANGRY STARTING");

    if (angryAmount === 0) {
      console.log("test");
      setAngry(true);
      setTimeout(() => {
        animateText(
          `HOW DARE YOU! ARE YOU TRYING TO BREAK THE SYSTEM. WHAT EVEN IS A ${cause}.`,
          150,
          setAngryText,
          temp
        );
      }, 5000);
    }
    if (angryAmount > 0) {
      setAngry(true);
      setTimeout(() => {
        animateText(
          `I already gave you a warning and you messed up. you know what. you should just give up.`,
          150,
          setAngryText,
          () => {
            setTimeout(() => {
              setAngry(false);
              animateText(`Have fun!`, 350, setAngryText, () => {
                window.location.href = "/week1/p-tiktok";
              });
            }, 1500);
          }
        );
      }, 5000);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const words = curString.trim().split(/\s+/);
    if (words.length < 50) {
      setPopupVisible(true);
      return;
    }

    let pos = 0;
    console.log("length of all words", allWords.length);
    for (const word of words) {
      console.log("words!");
      if (word.trim() !== "") {
        let unformattedWord = word
          .trim()
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

        if (!allWords.includes(unformattedWord, 0)) {
          console.log("IT DOESNT WORK", unformattedWord);
          pos -= 1;
          angryFunc(unformattedWord);
        }
      }
      pos += 1;
    }

    if (pos >= words.length) {
      console.log("everything done.");
      setSearchComplete(true);
    }
  };

  useEffect(() => {
    if (!angry && searchComplete) {
      setTimeout(() => {
        setWeek2Visible(true);
        console.log("done!");
      }, 2500);
    }
  }, [searchComplete]);

  const updateCurString = (event) => {
    setCurString(event.target.value);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <Border
        content={
          <>
            <Countdown />
            <GoToWeek weekNumber={2} opacity={week2Visible ? 1 : 0} />
            <Happiness />
            {popupVisible ? (
              <Popup
                message={"You need need 50 words to submit 😡"}
                closePopup={closePopup}
                // Make a fade in and out effect when closed / opened
                style={{ top: "30%", left: "34.5%" }}
              />
            ) : (
              ""
            )}
            <Notification text="Good job! You decided to work! 😁" />
            <Window left={100} top={150} />
            <Window right={100} top={150} />
            <textarea
              type="text"
              className="essay"
              onChange={updateCurString}
              value={curString}
            ></textarea>
            <Computer
              videos={[]}
              computerText={""}
              smallComputerText={""}
              style={[]}
              logo={false}
            />
            <ProgressBar
              title={`Task: Write a ${WORD_MINIMUM} word essay!`}
              top={"25%"}
              titleTop={"22%"}
              left={"35%"}
              width={"30%"}
              progressWidth={`${
                (curString.trim().split(/\s+/).length / WORD_MINIMUM) * 100
              }%`}
            />
            <Submit
              submitText={"Submit your Essay!"}
              genStyle={{
                position: "absolute",
                top: "56%",
                left: "calc(50% - 100px)",
              }}
              submitFunction={handleSubmit}
            />
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

export default Work;
