import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Canvas, useFrame } from "@react-three/fiber";
import { Effects, Sky } from "@react-three/drei";

import Border from "../../../components/Border";
import Happiness from "../../../components/Happiness";
import Notification from "../../../components/Notification";
import Popup from "../../../components/Popup";
import GoToWeek from "../../../components/GoToWeek";

import Countdown from "../../../components/Countdown";

import "./Park.css";
// Component to create a tree
function Tree({ position }) {
  return (
    <mesh position={position}>
      {/* Trunk */}
      <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
      <meshStandardMaterial color="saddlebrown" />
      {/* Leaves */}
      <mesh position={[0, 1, 0]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </mesh>
  );
}

// Component to control camera movement
function CameraController({ cameraZ }) {
  const cameraRef = useRef();

  useFrame(({ camera }) => {
    camera.position.z = cameraZ;
    cameraRef.current = camera;
  });

  return null;
}

function Park() {
  const [firstPopup, setFirstPopup] = useState(true);
  const [treePos, setTreePos] = useState([]);
  const [ballPos, setBallPos] = useState([]);
  const [popupSmallText, setPopupSmallText] = useState("");
  const [week1, setWeek1] = useState("");
  const [popupDisabled, setPopupDisabled] = useState(true);
  const [cameraZ, setCameraZ] = useState(10); // Move cameraZ state here
  const [closedPopups, setClosedPopups] = useState(0);
  const [week3Visible, setWeek3Visible] = useState(false);
  const stopDouble = useRef(false);

  useEffect(() => {
    if (!stopDouble) return;
    stopDouble.current = true;
    let happiness = 0;
    fetch("http://localhost:5000/getData")
      .then((response) => response.json())
      .then((data) => {
        let week1Value = "";

        happiness = data["happiness"];
        week1Value = data["decisions"][1];

        setWeek1(week1Value);
        let week4Exists = data["decisions"][2];
        if (week4Exists === "") {
          try {
            const response = axios.put("http://localhost:5000/updateData", {
              happiness: Math.min(happiness + 2, 10),
              decisions: {
                2: "park",
              },
            });
          } catch (error) {
            console.error(error);
          }
        }

        let week1Action = "";
        switch (week1Value) {
          case "sleep":
            week1Action = "sleeping";
            break;
          case "tiktok":
            week1Action = "scrolling tiktok";
            break;
          case "youtube":
            week1Action = "watching youtube";
            break;
          case "work":
            week1Action = "working";
            break;
          default:
            week1Action = "doing something";
        }
        animateText(
          `Friend: yo what have you been doing over the\nsummer\nMe: Well I've been ${week1Action} for the last week.`,
          100,
          setPopupSmallText,
          () => {
            setPopupDisabled(false); // Enable the popup close button
          }
        );
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const secondPopup = () => {
    setFirstPopup(true);
    setPopupDisabled(true);
    animateText(
      `Me: Well what have you been doing?\nFriend: I've been working on this thing. Maybe\ni can show it to you later.`,
      100,
      setPopupSmallText,
      () => {
        setPopupDisabled(false);
      }
    );
  };

  const disablePopup = () => {
    setClosedPopups((prev) => prev + 1);
    console.log(closedPopups);
    if (closedPopups <= 0) {
      setFirstPopup(false);
      const interval = setInterval(() => {
        setCameraZ((prevZ) => {
          if (prevZ <= 0) {
            clearInterval(interval);
            setTimeout(() => {
              secondPopup();
            }, 1500);
            return prevZ;
          }
          return prevZ - 0.02;
        });
      }, 10);
    } else {
      setTimeout(() => {
        setWeek3Visible(true);
        console.log("done!");
      }, 2500);
    }
  };

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  const generateTreePositions = (number) => {
    let cur = [];
    const cameraPosition = [0, 1, 4]; // Adjust this to match your camera position

    for (let i = 0; i < number; i++) {
      let position;
      do {
        position = [random(-5, 5), 0, random(-10, 10)];
      } while (Math.abs(position[0] - cameraPosition[0]) <= 1.5);

      cur.push(position);
    }
    setTreePos(cur);
  };

  const generateBallPositions = (number) => {
    let positions = [];
    for (let i = 0; i < number; i++) {
      positions.push([random(-2, 2), 0.01, random(-2, 10)]);
    }
    setBallPos(positions);
  };

  const animateText = (text, waitTime, settingFunction, callback) => {
    console.log(text, waitTime);
    let counter = 0;
    const interval = setInterval(() => {
      if (counter >= text.length) {
        settingFunction(text); // Set full text when animation completes
        clearInterval(interval); // Clear interval
        if (callback) {
          callback();
        }
      } else {
        settingFunction(text.substring(0, counter) + " |"); // Update curString progressively
        counter += 1;
      }
    }, waitTime);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  };

  useEffect(() => {
    generateTreePositions(40); // Generate 40 random tree positions with a minimum distance of 2 units from the camera
    generateBallPositions(50); // Generate 50 random ball positions
  }, []);

  return (
    <>
      <Border
        bgColor={"#87CEEB"}
        content={
          <>
            <Countdown />
            <GoToWeek weekNumber={3} opacity={week3Visible ? 1 : 0} />
            <Notification text={"You decided to go to the park!"} />
            <Happiness />
            <Popup
              message={"You arrived at the park!"}
              smallText={popupSmallText}
              closePopup={disablePopup}
              closeText={"Move forward!"}
              style={{
                left: "39%",
                top: "40%",
                opacity: firstPopup ? 1 : 0,
              }}
              disabled={popupDisabled}
            />
            <Canvas
              className="canvas"
              camera={{ position: [0, 1, 4] }}
              controls={false}
            >
              <CameraController cameraZ={cameraZ} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              {/* Ground */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                <planeGeometry args={[40, 40]} />
                <meshStandardMaterial color="lightgreen" />
              </mesh>
              {/* Road */}
              <mesh position={[0, 0, 4]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[4, 32]} />
                <meshStandardMaterial color="rgb(139, 69, 19)" /> {/* Brown */}
              </mesh>
              {/* Dark Brown Dots */}
              {ballPos.map((position, index) => (
                <mesh key={index} position={position}>
                  <sphereGeometry args={[0.05, 16, 16]} />
                  <meshStandardMaterial color="rgb(101, 67, 33)" />{" "}
                  {/* Dark Brown */}
                </mesh>
              ))}
              {/* Trees */}
              {treePos.map((position, index) => (
                <Tree key={index} position={position} />
              ))}
              {/* Sky */}
              <Sky
                distance={450000}
                sunPosition={[1, 1, 1]}
                inclination={0}
                azimuth={0.25}
                turbidity={10}
                rayleigh={2}
              />
              <color attach="background" args={["#87CEEB"]} /> {/* Sky Blue */}
            </Canvas>
          </>
        }
      />
    </>
  );
}

export default Park;
