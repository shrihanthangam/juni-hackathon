import React, { useEffect, useState } from "react";
import axios from "axios";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Border from "../../../components/Border";
import Phone from "../../../components/Phone";
import GoToWeek from "../../../components/GoToWeek";
import Notification from "../../../components/Notification";

import "./Eat.css";

function Building() {
  const { scene } = useGLTF(`/models/buildings/gm_bigcity.glb`);

  const degrees = 110;
  const radians = (degrees * Math.PI) / 180;

  scene.rotation.y = radians;

  return <primitive object={scene} position={[38.5, 4.25, -38]} scale={0.1} />;
}

function BobaDrink({ option }) {
  const { scene } = useGLTF(`/models/food/${option}.glb`);

  const scale = option === "burger" ? 0.175 : option === "hotdog" ? 0.02 : 0.15;
  const position =
    option === "burger"
      ? [4.4, 4.5, 14.5]
      : option === "hotdog"
      ? [4.5, 4.75, 14.5]
      : [4.45, 4.5, 14.5];

  return <primitive object={scene} scale={scale} position={position} />;
}

function CameraController() {
  useFrame(({ camera }) => {
    camera.position.set(5, 5, 15);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Eat() {
  const [bobaOption, setBobaOption] = useState();
  const [phoneTop, setPhoneTop] = useState(40);
  const [week3Visible, setWeek3Visible] = useState(false);
  const [drinkConsumed, setDrinkConsumed] = useState(false);

  useEffect(() => {
    let happiness = 0;
    fetch("http://localhost:5000/getData")
      .then((response) => response.json())
      .then((data) => {
        happiness = data["happiness"];
        let week4Exists = data["decisions"][2];
        if (week4Exists === "") {
          try {
            const response = axios.put("http://localhost:5000/updateData", {
              happiness: Math.min((happiness += 1), 10),
              decisions: {
                2: "boba",
              },
            });
          } catch (error) {
            console.error(error);
          }
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const bobaOptions = {
    burger: ["Burgers", (e) => setBobaOption("burger")],
    hotdog: ["Hotdogs", (e) => setBobaOption("hotdog")],
    fries: ["French Fries", (e) => setBobaOption("fries")],
  };

  useEffect(() => {
    if (bobaOption) {
      console.log("Boba option chosen!");
      const interval = setInterval(() => {
        setPhoneTop((prev) => prev + 3);
      }, 6);
      return () => clearInterval(interval);
    }
  }, [bobaOption]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "e" && bobaOption) {
        setDrinkConsumed(true);
        setTimeout(() => {
          setDrinkConsumed(false);
          setBobaOption(null);

          setTimeout(() => {
            setWeek3Visible(true);
          }, 1500);
        }, 2000); // Reset after 2 seconds
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [bobaOption]);

  return (
    <>
      <Border
        content={
          <>
            <Notification text={"You decided to eat some food"} />
            <div className="boba-container">
              <GoToWeek weekNumber={4} opacity={week3Visible ? 1 : 0} />
              <Phone
                notiText={"Open the shop!"}
                phoneHeading={"What food do you want?"}
                addHeading={true}
                options={bobaOptions}
                style={{
                  top: `${phoneTop}px`,
                  backgroundImage: `url("/pngs/iphone-inside.png")`,
                  backgroundSize: "cover",
                  position: "absolute",
                }}
              />
              {bobaOption && !drinkConsumed && (
                <p className="e-drink">Press e to eat!</p>
              )}
              {drinkConsumed && (
                <p className="e-drink">Yum! That was delicious!</p>
              )}
              <Canvas className="boba-canvas">
                <ambientLight intensity={4} />
                <pointLight position={[10, 10, 10]} />
                <directionalLight position={[-5, 5, 5]} intensity={0.5} />
                {bobaOption && <BobaDrink option={bobaOption} />}
                <Building />
                <CameraController />
              </Canvas>
            </div>
          </>
        }
      />
    </>
  );
}

export default Eat;
