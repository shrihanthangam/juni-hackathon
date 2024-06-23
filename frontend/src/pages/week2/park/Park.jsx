import React, { useState, useEffect } from "react";
import Border from "../../../components/Border";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

// Function to load GLTF models
const loadModel = (url) => {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(url, resolve, undefined, reject);
  });
};

// Component to create a tree with different models
function Tree({ position }) {
  const [treeModel, setTreeModel] = useState(null);

  useEffect(() => {
    // Load different tree models randomly
    const modelUrls = [
      "/models/tree1.glb",
      "/models/tree2.glb",
      "/models/tree3.glb",
      "/models/tree4.glb",
      "/models/tree5.glb",
      "/models/tree6.glb",
      "/models/tree7.glb",
    ];
    const randomModelIndex = Math.floor(Math.random() * modelUrls.length);
    loadModel(modelUrls[randomModelIndex]).then((gltf) => {
      setTreeModel(gltf.scene);
    });
  }, []);

  return treeModel ? (
    <primitive object={treeModel} position={position} />
  ) : null;
}

function Park() {
  const [treePos, setTreePos] = useState([]);

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  const generateTreePositions = (number, minDistance) => {
    let cur = [];
    const cameraPosition = [0, 1, 4]; // Adjust this to match your camera position

    for (let i = 0; i < number; i++) {
      let position;
      do {
        position = [random(-5, 5), 0, random(-2, 10)];
      } while (distance(position, cameraPosition) < minDistance);

      cur.push(position);
    }
    setTreePos(cur);
  };

  const distance = (pos1, pos2) => {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) +
        Math.pow(pos1[1] - pos2[1], 2) +
        Math.pow(pos1[2] - pos2[2], 2)
    );
  };

  useEffect(() => {
    generateTreePositions(20, 2); // Generate 20 random tree positions with a minimum distance of 2 units from the camera
  }, []);

  return (
    <>
      <Border
        content={
          <>
            <h1>test</h1>
            <Canvas
              className="canvas"
              camera={{ position: [0, 1, 4] }}
              controls={false}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />

              {/* Ground */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="lightgreen" />
              </mesh>

              {/* Trees */}
              {treePos.map((position, index) => (
                <Tree key={index} position={position} />
              ))}
            </Canvas>
          </>
        }
      />
    </>
  );
}

export default Park;
