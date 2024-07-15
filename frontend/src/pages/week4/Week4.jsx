import Border from "../../components/Border";
import Notification from "../../components/Notification";
import Phone from "../../components/Phone";
import Window from "../../components/Window";
import Happiness from "../../components/Happiness";
import Countdown from "../../components/Countdown";

function Week4() {
  const handleClick = (option) => {
    console.log(option);
    window.location.href = `/week4/${option}`;
  };

  const phoneOptions = {
    coding: ["Start Coding!", handleClick],
    procrastinate: ["procrastinate!!!", handleClick],
    sleep: ["or 😴", handleClick],
  };

  return (
    <>
      <Border
        content={
          <>
            <Countdown />
            <Happiness />
            <Notification text={"Welcome to Week 4!"} />
            <Window left={100} top={150} /> {/* Left Window */}
            <Window right={100} top={150} />
            {/* Right Window */}
            <Phone
              phoneHeading={"Week 4: What should I do?"}
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

export default Week4;
