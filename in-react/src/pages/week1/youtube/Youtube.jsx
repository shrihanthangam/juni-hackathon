import React, { useState, useEffect, useRef } from "react";

import "../../../static/css/WhiteOverlay.css";

import Notification from "../../../components/Notification";
import Computer from "../../../components/Computer";
import Border from "../../../components/Border";
import Window from "../../../components/Window";

import t1 from "../../../static/images/thumbnails/t1.jpg";
import t2 from "../../../static/images/thumbnails/t2.jpg";
import t3 from "../../../static/images/thumbnails/t3.jpg";
import t4 from "../../../static/images/thumbnails/t4.jpg";

function Youtube() {
  const [curString, setCurString] = useState("");
  const [curSmallString, setCurSmallString] = useState("");

  const [topStyle, setTopStyle] = useState({ left: "-575px" });
  const [bottomStyle, setBottomStyle] = useState({
    top: "225px",
    right: "-575px",
  });

  const [topRightStyle, setTopRightStyle] = useState({ left: "960px" });
  const [bottomRightStyle, setBottomRightStyle] = useState({
    top: "225px",
    right: "960px",
  });

  const [curMoveRate, setCurMoveRate] = useState(10);
  const moveRateRef = useRef(curMoveRate);
  moveRateRef.current = curMoveRate;

  const [isWhitened, setIsWhitened] = useState(false);

  const [textClass, setTextClass] = useState("");
  const textClassRef = useRef(textClass);
  textClassRef.current = textClass;

  const whitenScreen = () => {
    setIsWhitened(true);
  };

  const animateThumbnails = () => {
    const interval = setInterval(() => {
      if (moveRateRef.current >= 80) {
        whitenScreen();
      }

      if (moveRateRef.current >= 350) {
        clearInterval(interval);
        setTopStyle({ display: "none" });
        setTopRightStyle({ display: "none" });
        setBottomStyle({ display: "none" });
        setBottomRightStyle({ display: "none" });

        animateText(". . .", 1500, setCurString, () => {
          setTimeout(() => {
            setCurString("");
            animateText(
              "good job! you decided to wake up and\n\nprocrastinate. you're so smart for that one.\n\nyou're gonna feel happy now but sooner\n\nor later your gonna regret always\n\nprocrastinating. good job!!!!!",
              150,
              setCurSmallString
            );
          }, 1500);
        });

        return;
      }

      setTopStyle((prevStyle) => {
        let oldLeft = parseInt(prevStyle.left, 10);

        if (oldLeft >= 1600) {
          setCurMoveRate((prevRate) => prevRate + 8);
          oldLeft = -800 - moveRateRef.current;
        }

        return {
          ...prevStyle,
          left: `${oldLeft + moveRateRef.current}px`,
        };
      });

      setBottomStyle((prevStyle) => {
        let oldRight = parseInt(prevStyle.right, 10);

        if (oldRight >= 1600) {
          oldRight = -800 - moveRateRef.current;
        }

        return {
          ...prevStyle,
          right: `${oldRight + moveRateRef.current}px`,
        };
      });

      setTopRightStyle((prevStyle) => {
        let oldLeft = parseInt(prevStyle.left, 10);

        if (oldLeft >= 1600) {
          oldLeft = -800 - moveRateRef.current;
        }

        return {
          ...prevStyle,
          left: `${oldLeft + moveRateRef.current}px`,
        };
      });

      setBottomRightStyle((prevStyle) => {
        let oldRight = parseInt(prevStyle.right, 10);

        if (oldRight >= 1600) {
          oldRight = -800 - moveRateRef.current;
        }

        return {
          ...prevStyle,
          right: `${oldRight + moveRateRef.current}px`,
        };
      });
    }, 20);

    return () => clearInterval(interval);
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
        console.log(counter, text.substring(0, counter));
        counter += 1;
      }
    }, waitTime);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  };

  useEffect(() => {
    moveRateRef.current = curMoveRate;
  }, [curMoveRate]);

  useEffect(() => {
    animateThumbnails();
  }, []);

  return (
    <>
      <Border
        content={
          <>
            <div
              className={`white-overlay ${isWhitened ? "visible" : ""}`}
            ></div>
            <Window left={100} top={100} /> {/* Left Window */}
            <Window left={"calc(100% - 500px)"} top={100} />
            {/* Right Window */}
            <Notification text={"You're watching youtube! ☹️"} />
            <Computer
              videos={[t1, t2, t3, t4]}
              computerText={curString}
              smallComputerText={curSmallString}
              style={[topStyle, bottomStyle, topRightStyle, bottomRightStyle]}
            />
          </>
        }
      />
    </>
  );
}

export default Youtube;
