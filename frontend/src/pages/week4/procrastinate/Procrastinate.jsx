import { useState } from "react";

import Border from "../../../components/Border";
import Happiness from "../../../components/Happiness";
import Notification from "../../../components/Notification";
import Window from "../../../components/Window";
import Phone from "../../../components/Phone";

function Procrastinate() {
  return (
    <>
      <Happiness />
      <Border
        content={
          <>
            <Notification text={"Good job! You decided to procrastinate."} />
            <Window left={100} top={100} />

            <Window left={"calc(100% - 500px)"} top={100} />

            <Phone
              phoneHeading={"procrastination!"}
              options={[]}
              phoneText={"test"}
              style={{ top: "22%" }}
            />
          </>
        }
      />
    </>
  );
}

export default Procrastinate;
