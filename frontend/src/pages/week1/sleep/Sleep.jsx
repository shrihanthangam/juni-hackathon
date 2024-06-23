import axios from "axios";
import { useState, useEffect } from "react";

import Border from "../../../components/Border";
import Notification from "../../../components/Notification";
import Window from "../../../components/Window";
import Phone from "../../../components/Phone";
import Happiness from "../../../components/Happiness";
import GoToWeek from "../../../components/GoToWeek";
import "../../../static/css/BlackOverlay.css";

function Sleep() {
  const [blink, setBlink] = useState(false);
  const [blur, setBlur] = useState(false);
  const [transitionTime, setTransitionTime] = useState(3);
  const [curString, setCurString] = useState("");
  const [week2Visible, setWeek2Visible] = useState(false);

  const startBlink = () => {
    setBlink(true);
    console.log(`blink black-overlay${blink ? " visible" : ""}`);
  };

  useEffect(() => {
    async function updateData() {
      try {
        const response = await axios.post("http://localhost:5000/updateData", {
          happiness: 4,
          decisions: {
            1: "sleep",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
          },
        });
        console.log("Data updated successfully");
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
    updateData();
  }, []);

  useEffect(() => {
    // sorry if you read this!
    setTimeout(() => {
      startBlink();

      setTimeout(() => {
        setBlink(false);
      }, transitionTime * 1000 + 500);

      setTimeout(() => {
        setTransitionTime(2);
        startBlink();

        setTimeout(() => {
          setBlink(false);
        }, transitionTime * 1000 + 500);

        setTimeout(() => {
          setTransitionTime(1);
          startBlink();
          setTimeout(() => {
            setBlink(false);
          }, transitionTime * 1000 + 500);

          setTimeout(() => {
            setTransitionTime(0.5);
            startBlink();
            setBlur(true);
            console.log(`${blur ? "block" : "none"}`);

            setTimeout(() => {
              setBlink(false);
              animateText(
                "ugh why is everything so blurry?",
                150,
                setCurString,
                () => {
                  setTimeout(() => {
                    animateText(". . .", 1000, setCurString, () => {
                      setTimeout(() => {
                        animateText(
                          "ehh i'll just sleep it off and hope it gets better. (good job you should've just gotten up)!",
                          100,
                          setCurString,
                          () => {
                            setTimeout(() => {
                              setWeek2Visible(true);
                              console.log("done!");
                            }, 2500);
                          }
                        );
                      }, 1000);
                    });
                  }, 1000);
                }
              );
            }, transitionTime * 1000 + 500);
          }, transitionTime * 1000 + 1500);
        }, transitionTime * 1000 + 1500);
      }, transitionTime * 1000 + 2500);
    }, 2000);
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
        // finished(true);
      } else {
        settingFunction(text.substring(0, counter) + " |"); // Update curString progressively
        console.log(counter, text.substring(0, counter));
        counter += 1;
      }
    }, waitTime);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  };

  return (
    <>
      <Border
        content={
          <>
            <GoToWeek weekNumber={2} opacity={week2Visible ? 1 : 0} />
            <Happiness />
            <div className={`${blur ? "blur" : ""}`}>
              <Notification text={"You decided to sleep more 😴"} />
              <div
                id="blink"
                style={{ transition: `opacity ${transitionTime}s ease` }}
                className={`black-overlay${blink ? " visible" : ""}`}
              />
              <Window left={100} top={100} />
              <Window left={"calc(100% - 500px)"} top={100} />
              {blur && <p id="text">{curString}</p>}
            </div>
          </>
        }
      />
    </>
  );
}

export default Sleep;
