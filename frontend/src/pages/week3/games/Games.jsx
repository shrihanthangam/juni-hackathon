import { useState, useEffect, useRef } from "react";
import Border from "../../../components/Border";
import Notification from "../../../components/Notification";
import "./Games.css";

function Games() {
  const moveSpeed = 8;
  const circleMoveSpeed = 2;
  const playerSize = 35; // Size of the player (assuming a square for simplicity)
  const gameWidth = window.innerWidth - 10 - playerSize / 2; // Set the width of the game area
  const gameHeight = window.innerHeight - 10 - playerSize / 2; // Set the height of the game area
  const keysPressed = useRef({});

  const [playerX, setPlayerX] = useState(10);
  const [playerY, setPlayerY] = useState(gameHeight - 20);
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [startUp, setStartUp] = useState(true);
  const [timeLeft, setTimeLeft] = useState(45); // Timer starts at 60 seconds
  const [gameEnded, setGameEnded] = useState(false);
  const [result, setResult] = useState(null); // "win" or "lose"

  const distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  useEffect(() => {
    if (!gameStarted) return;

    // Function to spawn a new circle
    const spawnCircle = () => {
      const x = Math.random() * (gameWidth - 25);
      const y = Math.random() * (gameHeight - 100);
      return [x, y];
    };

    // Initialize with 10 circles
    const initialCircles = Array.from({ length: 10 }, spawnCircle);
    setCircles(initialCircles);

    const moveCircles = () => {
      setCircles((prevCircles) =>
        prevCircles.map(([x, y]) => {
          // Move circle down by circleMoveSpeed
          const newY = y + circleMoveSpeed;

          // If circle moves under the screen, reset to top with random x-coordinate
          if (newY > gameHeight) {
            return [Math.random() * (gameWidth - 25), 0];
          } else {
            return [x, newY];
          }
        })
      );
    };

    const intervalId = setInterval(moveCircles, 10); // Adjust the interval to control the speed

    return () => clearInterval(intervalId);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;

    const keyDown = (event) => {
      keysPressed.current[event.key] = true;
    };

    const keyUp = (event) => {
      keysPressed.current[event.key] = false;
    };

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    const movePlayer = () => {
      if (keysPressed.current["ArrowRight"]) {
        setPlayerX((prev) =>
          Math.min(prev + moveSpeed, gameWidth - playerSize)
        );
      }
      if (keysPressed.current["ArrowLeft"]) {
        setPlayerX((prev) => Math.max(prev - moveSpeed, 0));
      }
      if (keysPressed.current["ArrowUp"]) {
        setPlayerY((prev) => Math.max(prev - moveSpeed, 0));
      }
      if (keysPressed.current["ArrowDown"]) {
        setPlayerY((prev) =>
          Math.min(prev + moveSpeed, gameHeight - playerSize)
        );
      }
      requestAnimationFrame(movePlayer);
    };

    movePlayer();

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, [gameStarted, gameWidth, gameHeight]);

  useEffect(() => {
    if (!gameStarted) return;

    // Check distance from player to circles whenever playerX or playerY change
    circles.forEach(([x, y], index) => {
      const dist = distance(playerX, playerY, x, y);
      if (dist <= playerSize + 10) {
        // Collision detected
        setScore((prev) => prev + 1);
        setCircles((prevCircles) => {
          const newCircles = [...prevCircles];
          newCircles[index] = [Math.random() * (gameWidth - 25), 0]; // Respawn the circle at the top
          return newCircles;
        });
      }
    });

    if (score >= 50) {
      setGameEnded(true);
      setResult("win");
      setGameStarted(false);
    }
  }, [playerX, playerY, circles, score, gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft <= 0) {
      setGameEnded(true);
      setResult(score >= 50 ? "win" : "lose");
      setGameStarted(false);
    }

    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, score]);

  const turnOnGame = () => {
    setStartUp(false);
    setTimeout(() => {
      setGameStarted(true);
    }, 2000);
  };

  const restart = () => {
    setGameEnded(false);
    setStartUp(false);
    setGameStarted(true);
    setTimeLeft(45);
  };

  return (
    <>
      <Border
        content={
          <>
            <div className="startup" style={{ opacity: `${startUp ? 1 : 0}` }}>
              <p id="name">Get the balls!</p>
              <p id="instructions">
                <b>Instructions:</b> Use the arrow keys to move around your
                character and try to get all the green balls.
              </p>
              <p id="objective">
                <b>Objective:</b> Get 50 green balls before the timer runs out!
              </p>
              <button id="startup-button" onClick={turnOnGame}>
                Start Game!
              </button>
            </div>

            <p style={{ display: `${gameStarted ? "block" : "none"}` }}>
              Score: {score}
            </p>
            <p
              className="timer"
              style={{ display: `${gameStarted ? "block" : "none"}` }}
            >
              Time Left: {timeLeft}s
            </p>
            <Notification text={"You decided to play some games!"} />
            <div
              id="player"
              style={{
                left: `${playerX}px`,
                top: `${playerY}px`,
                position: "absolute",
                width: `${playerSize}px`,
                height: `${playerSize}px`,
                backgroundColor: "blue", // Example styling for visibility
                display: `${gameStarted ? "block" : "none"}`,
              }}
            ></div>
            {circles.map((circle, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${circle[0]}px`,
                  top: `${circle[1]}px`,
                  width: `25px`,
                  height: `25px`,
                  borderRadius: "50%",
                  backgroundColor: "green",
                }}
              ></div>
            ))}
            {gameEnded && (
              <div className="end-screen">
                {result === "win" ? (
                  <div className="firework"></div>
                ) : (
                  <div className="sad-face"></div>
                )}
                <p>{result === "win" ? "Congratulations!" : ""}</p>
                <button id="tryagain" onClick={restart}>
                  {result === "win" ? "" : "Try Again"}
                </button>
              </div>
            )}
          </>
        }
      />
    </>
  );
}

export default Games;
