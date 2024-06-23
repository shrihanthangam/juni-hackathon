import "../static/css/ProgressBar.css";

function ProgressBar({ title, top, titleTop, left, width, progressWidth }) {
  return (
    <>
      <p id="progress-bar-title" style={{ left: "50%", top: titleTop }}>
        {title}
      </p>
      <div
        className="progress-bar-container"
        style={{ top: top, left: left, width: width }}
      >
        <div
          className="progress-bar"
          id="progress-bar"
          style={{ width: progressWidth }}
        ></div>
      </div>
    </>
  );
}

export default ProgressBar;
