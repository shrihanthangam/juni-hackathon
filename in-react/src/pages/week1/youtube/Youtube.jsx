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

  const [isWhitened, setIsWhitened] = useState(false);

  const moveRateRef = useRef(curMoveRate);
  moveRateRef.current = curMoveRate;

  const whitenScreen = () => {
    setIsWhitened(true);
  };

  const animateThumbnails = () => {
    const interval = setInterval(() => {
      if (moveRateRef.current >= 80) {
        console.log("done!");
        whitenScreen();
      }

      if (moveRateRef.current >= 350) {
        clearInterval(interval);
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
              style={[topStyle, bottomStyle, topRightStyle, bottomRightStyle]}
            />
          </>
        }
      />
    </>
  );
}

export default Youtube;
