import axios from "axios";
import { useState, useEffect } from "react";

import Border from "../../../components/Border";

function Eat() {
  useEffect(() => {
    fetch("http://localhost:5000/getData")
      .then((response) => response.json())
      .then((data) => {
        let week4Exists = data["decisions"][3];
        if (week4Exists === "") {
          try {
            const response = axios.put("http://localhost:5000/updateData", {
              decisions: {
                3: "food",
              },
            });
          } catch (error) {
            console.error(error);
          }
        }
      });
  }, []);

  return (
    <>
      <Border
        content={
          <>
            <h1>test</h1>
          </>
        }
      />
    </>
  );
}

export default Eat;
