import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Border from "../../../components/Border";
import Phone from "../../../components/Phone";
import GoToWeek from "../../../components/GoToWeek";
import Notification from "../../../components/Notification";

function BobaStore() {
  const { scene } = useGLTF("../../../../public/models/BobaMap/bobaMap.glb");

  return <primitive object={scene} scale={1.5} position={[0, -5, -10]} />;
}

function BobaDrink(bobaOption) {
  const { scene } = useGLTF(`/models/${bobaOption["option"]}.glb`);

  if (bobaOption["option"] === "brown_sugar_boba") {
    return <primitive object={scene} scale={20} position={[-8, 0, 0]} />;
  } else if (bobaOption["option"] === "pink_sugar_boba") {
    return <primitive object={scene} scale={1} position={[-2.5, -2, 0]} />;
  } else if (bobaOption["option"] === "macha_boba") {
    return <primitive object={scene} scale={250} position={[0.5, -2, 0]} />;
  }
}

function CameraController() {
  const camera = useRef();

  useFrame(({ camera }) => {
    // Adjust these values to change the camera angle
    camera.position.set(5, 5, 15);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Boba() {
  const [bobaOption, setBobaOption] = useState(null);
  const [phoneTop, setPhoneTop] = useState(40);
  const [week3Visible, setWeek3Visible] = useState(false);

  const bobaOptions = {
    brown_sugar_boba: [
      "Brown Sugar Boba",
      (e) => {
        setBobaOption("brown_sugar_boba", setPhoneTop);
      },
    ],
    macha_boba: [
      "Boba with Macha",
      (e) => setBobaOption("macha_boba", setPhoneTop),
    ],
    pink_sugar_boba: [
      "Pink Sugar Boba",
      (e) => setBobaOption("pink_sugar_boba", setPhoneTop),
    ],
  };

  useEffect(() => {
    if (bobaOption) {
      console.log("Boba option chosen!");
      const interval = setInterval(() => {
        setPhoneTop((prev) => prev + 2);
      }, 10);
    }
  }, [bobaOption]);

  return (
    <>
      <Border
        content={
          <>
            <Notification text={"You decided to drink some boba"} />
            <GoToWeek weekNumber={3} opacity={week3Visible ? 1 : 0} />
            <Phone
              phoneHeading={"What drink do you want?"}
              options={bobaOptions}
              style={{ top: `${phoneTop}px` }}
            />
            <Canvas style={{ height: "100vh" }} camera={{ fov: 50 }}>
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} />
              <directionalLight position={[-5, 5, 5]} intensity={0.5} />
              {bobaOption ? <BobaDrink option={bobaOption} /> : ""}
              <CameraController />
            </Canvas>
          </>
        }
      />
    </>
  );
}

export default Boba;
