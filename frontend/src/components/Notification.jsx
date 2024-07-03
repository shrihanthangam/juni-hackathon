import "../static/css/Notification.css";
import { useState, useEffect } from "react";

function Notification({ text }) {
  const [activated, setActivated] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    let interval;
    if (!hovered) {
      interval = setInterval(() => {
        setActivated((prev) => !prev);
      }, 1500);
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [hovered]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClose = () => {
    setClosed(true);
  };

  if (closed) return null;

  return activated ? (
    <div
      id="notification"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p>
        <i className="fas fa-info-circle"></i>
        {text}
        <span className="close" onClick={handleClose}>
          &times;
        </span>
      </p>
    </div>
  ) : null;
}

export default Notification;
