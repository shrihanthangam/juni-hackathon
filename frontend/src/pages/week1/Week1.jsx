import { useState, useEffect } from "react";

import Border from "../../components/Border";
import Notification from "../../components/Notification";
import Phone from "../../components/Phone";
import Window from "../../components/Window";
import Happiness from "../../components/Happiness";
import BlackenScreen from "../../components/BlackenScreen";

function Week1() {
  const [blackScreen, setBlackScreen] = useState(true);
  const handleClick = (option) => {
    console.log(option);
    setBlackScreen(500);
    setTimeout(() => {
      window.location.href = `/week1/${option}`;
    }, 500);
  };
  useEffect(() => {
    setTimeout(() => {
      setBlackScreen(false);
    }, 500);
  }, []);

  const phoneOptions = {
    tiktok: ["Scroll Tiktok for 1... 2.... 3... hours", handleClick],
    youtube: ["Watch Youtube", handleClick],
    sleep: ["Get More Sleep", handleClick],
    work: ["Actually start working 🥱", handleClick],
  };

  return (
    <>
      <Border
        content={
          <>
            <BlackenScreen visible={blackScreen} />;
            <Happiness />
            <Notification text={"Summer just started!"} />
            <Window left={100} top={150} /> {/* Left Window */}
            <Window right={100} top={150} />
            {/* Right Window */}
            <Phone
              phoneHeading={"What should I do?"}
              options={phoneOptions}
              phoneText={""}
              style={{
                top: "12%",
                backgroundImage: `url("/pngs/iphone.png")`,
                backgroundSize: "cover",
              }}
            />
          </>
        }
      />
    </>
  );
}

export default Week1;
