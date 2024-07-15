import "../static/css/GoToWeek.css";

function GoToWeek({ weekNumber, opacity }) {
  if (weekNumber <= 4) {
    return (
      <>
        <div
          className="week2-container"
          style={{ opacity: `${opacity}`, zIndex: opacity == 1 ? 10001 : -1 }}
        >
          <p className="week2-text">Go to Week {weekNumber}</p>
          <button
            className="week2-button"
            onClick={() => (window.location.href = `/week${weekNumber}`)}
          >
            Yes
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="week2-container"
          style={{ opacity: `${opacity}`, zIndex: opacity == 1 ? 10001 : -1 }}
        >
          <p className="week2-text">Go to the End!</p>
          <button
            className="week2-button"
            onClick={() => (window.location.href = "/end")}
          >
            Yes
          </button>
        </div>
      </>
    );
  }
}

export default GoToWeek;
