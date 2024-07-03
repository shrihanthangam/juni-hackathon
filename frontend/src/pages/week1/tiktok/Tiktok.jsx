import axios from "axios";
import React, { useState, useEffect } from "react";

import Notification from "../../../components/Notification";
import Border from "../../../components/Border";
import Phone from "../../../components/Phone";
import Window from "../../../components/Window";
import Happiness from "../../../components/Happiness";
import GoToWeek from "../../../components/GoToWeek";

function Tiktok() {
  const [curString, setCurString] = useState("");
  const [firstDone, setFirstDone] = useState(false);
  const [week2Visible, setWeek2Visible] = useState(false);

  useEffect(() => {
    async function updateData() {
      try {
        const response = await axios.post("http://localhost:5000/changeData", {
          happiness: 3,
          decisions: {
            1: "tiktok",
            2: "",
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
  // Function to animate text
  const animateText = (text, waitTime, finished, callback) => {
    let counter = 0;
    const interval = setInterval(() => {
      if (counter >= text.length) {
        setCurString(text); // Set full text when animation completes
        clearInterval(interval); // Clear interval
        finished(true);
        if (callback) {
          callback();
        }
      } else {
        setCurString(text.substring(0, counter) + " |"); // Update curString progressively
        counter += 1;
      }
    }, waitTime);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  };

  useEffect(() => {
    const phoneText =
      "wow! you decided to scroll. you\n\nare being very productive. it must\n\nbe sooooooo hard. instead\n\nof actually working and you know...\n\ngetting better you decided to\n\nworkout your thumb muscles and\n\nscroll.You just wasted 3 hours and\n\nfeel horrible. Good job!!!!!!";

    if (firstDone === false) {
      animateText(phoneText, 100, setFirstDone, () => {
        setTimeout(() => {
          setWeek2Visible(true);
          console.log("done!");
        }, 2500);
      }); // Start text animation
    }
  }, []); // Empty dependency array ensures effect runs only once on component mount

  return (
    <>
      <Border
        content={
          <>
            <GoToWeek weekNumber={2} opacity={week2Visible ? 1 : 0} />
            <Happiness />
            <Notification text="You decided to scroll ☹️" />
            <Window left={100} top={100} /> {/* Left Window */}
            <Window left={"calc(100% - 500px)"} top={100} />
            {/* Right Window */}
            <Phone
              phoneHeading={"Yay you get to scroll!"}
              options={{}}
              phoneText={curString}
              style={{
                top: "12%",
                backgroundImage: `url("/pngs/iphone-inside.png")`,
                backgroundSize: "cover",
              }}
            />
          </>
        }
      />
    </>
  );
}

export default Tiktok;
