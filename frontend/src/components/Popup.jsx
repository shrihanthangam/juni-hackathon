import "../static/css/Popup.css";

function Popup({ message, closePopup, style }) {
  return (
    <>
      <div className="popup" style={style}>
        <div className="popup-inner">
          <h1 className="popup-message">{message}</h1>
          <button className="popup-close" onClick={closePopup}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default Popup;
