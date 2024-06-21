import Border from "../../components/Border";
import Notification from "../../components/Notification";
import Phone from "../../components/Phone";
import Window from "../../components/Window";

function Week1() {
  const handleClick = (option) => {
    console.log(option);
    window.location.href = `/week1/${option}`;
  };

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
            <Notification text={"Summer just started!"} />
            <Window left={100} top={100} /> {/* Left Window */}
            <Window left={"calc(100% - 500px)"} top={100} />
            {/* Right Window */}
            <Phone
              phoneHeading={"What should I do?"}
              options={phoneOptions}
              phoneText={""}
            />
          </>
        }
      />
    </>
  );
}

export default Week1;
