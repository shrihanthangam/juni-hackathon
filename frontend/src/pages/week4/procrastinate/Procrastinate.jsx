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
              happiness: Math.max((happiness -= 2), 0),
              decisions: {
                4: "procrastinate",
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
            <GoToWeek weekNumber={5} opacity={week2Visible ? 1 : 0} />
            <Happiness />
            <Notification text="You decided to scroll ☹️" />
            <Window left={100} top={150} /> {/* Left Window */}
            <Window right={100} top={150} />
            {/* Right Window */}
            <Phone
              phoneHeading={"You get to procrastinate!"}
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
