import "../static/css/Popup.css";

function Popup({ message, smallText, closePopup, closeText, disabled, style }) {
  if (!disabled) {
    disabled = false;
  }

  return (
    <>
      <div className="popup" style={style}>
        <div className="popup-inner">
          <h1 className="popup-message">{message}</h1>
          <p className="popup-smalltext">{smallText}</p>
          <br />
          <button
            disabled={disabled}
            className="popup-close"
            onClick={closePopup}
          >
            {closeText ? closeText : "Close"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Popup;
