import Border from "../../components/Border";
import Notification from "../../components/Notification";
import Phone from "../../components/Phone";
import Window from "../../components/Window";
import Happiness from "../../components/Happiness";

function Week2() {
  const handleClick = (option) => {
    console.log(option);
    window.location.href = `/week2/${option}`;
  };

  const phoneOptions = {
    park: ["Go to the park with your friends", handleClick],
    boba: ["get 🧋 with your friends", handleClick],
    sleep: ["or just stay in bed and sleep", handleClick],
  };

  return (
    <>
      <Border
        content={
          <>
            <Happiness />
            <Notification text={"Welcome to Week 2!"} />
            <Window left={100} top={100} /> {/* Left Window */}
            <Window left={"calc(100% - 500px)"} top={100} />
            {/* Right Window */}
            <Phone
              phoneHeading={"Week 2: What should I do?"}
              options={phoneOptions}
              phoneText={""}
              style={{ top: "22%" }}
            />
          </>
        }
      />
    </>
  );
}

export default Week2;
