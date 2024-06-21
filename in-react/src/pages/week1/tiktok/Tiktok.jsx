import React, { useState, useEffect } from "react";

import Notification from "../../../components/Notification";
import Border from "../../../components/Border";
import Phone from "../../../components/Phone";
import Window from "../../../components/Window";

function Tiktok() {
  const [curString, setCurString] = useState("");
  const [firstDone, setFirstDone] = useState(false);

  // Function to animate text
  const animateText = (text, waitTime, finished) => {
    let counter = 0;
    const interval = setInterval(() => {
      if (counter >= text.length) {
        setCurString(text); // Set full text when animation completes
        clearInterval(interval); // Clear interval
        finished(true);
      } else {
        setCurString(text.substring(0, counter) + " |"); // Update curString progressively
        counter += 1;
      }
    }, waitTime);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  };

  useEffect(() => {
    const phoneText =
      "\n\nwow! you decided to scroll. you are being very\n\nproductive. it must be sooooooo hard.\n\ninstead of actually working and you know...\n\ngetting better you decided to work out your\n\nthumb muscles and scroll. You just wasted 3\n\nhours and feel horrible. Good job!!!!!!";

    if (firstDone === false) {
      animateText(phoneText, 100, setFirstDone); // Start text animation
    }
  }, []); // Empty dependency array ensures effect runs only once on component mount

  return (
    <>
      <Border
        content={
          <>
            <Notification text="You decided to scroll ☹️" />
            <Window left={100} top={100} /> {/* Left Window */}
            <Window left={"calc(100% - 500px)"} top={100} />
            {/* Right Window */}
            <Phone
              phoneHeading={"Yay you get to scroll!"}
              options={{}}
              phoneText={curString}
            />
          </>
        }
      />
    </>
  );
}

export default Tiktok;
