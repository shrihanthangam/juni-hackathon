import axios from "axios";
import { useState, useEffect } from "react";

import Border from "../../../components/Border";
import Notification from "../../../components/Notification";
import Window from "../../../components/Window";
import Phone from "../../../components/Phone";
import Happiness from "../../../components/Happiness";
import GoToWeek from "../../../components/GoToWeek";
import "../../../static/css/BlackOverlay.css";
import Countdown from "../../../components/Countdown";

function Sleep2() {
  const [blink, setBlink] = useState(false);
  const [blur, setBlur] = useState(false);
  const [transitionTime, setTransitionTime] = useState(3);
  const [curString, setCurString] = useState("");
  const [week3Visible, setWeek3Visible] = useState(false);

  const startBlink = () => {
    setBlink(true);
    console.log(`blink black-overlay${blink ? " visible" : ""}`);
  };

  useEffect(() => {
    let happiness = 0;
    fetch("http://localhost:5000/getData")
      .then((response) => response.json())
      .then((data) => {
        happiness = data["happiness"];
        let week4Exists = data["decisions"][2];
        if (week4Exists === "") {
          try {
            const response = axios.put("http://localhost:5000/updateData", {
              happiness: Math.max((happiness -= 1), 0),
              decisions: {
                2: "sleep",
              },
            });
          } catch (error) {
            console.error(error);
          }
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
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
                              setWeek3Visible(true);
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
            <Countdown />
            <GoToWeek weekNumber={3} opacity={week3Visible ? 1 : 0} />
            <Happiness />
            <div className={`${blur ? "blur" : ""}`}>
              <Notification text={"You decided to sleep more 😴"} />
              <div
                id="blink"
                style={{ transition: `opacity ${transitionTime}s ease` }}
                className={`black-overlay${blink ? " visible" : ""}`}
              />
              <Window left={100} top={150} />
              <Window right={100} top={150} />
              {blur && <p id="text">{curString}</p>}
            </div>
          </>
        }
      />
    </>
  );
}

export default Sleep2;
