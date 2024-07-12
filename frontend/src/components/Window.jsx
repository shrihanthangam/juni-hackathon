import "../static/css/Window.css";

function Window({ left, right, top }) {
  if (left) {
    return (
      <div className="window" style={{ left: left, top: top }}>
        <div className="pane top-left"></div>
        <div className="pane top-right"></div>
        <div className="pane bottom-left"></div>
        <div className="pane bottom-right"></div>
      </div>
    );
  } else if (right) {
    return (
      <div className="window" style={{ right: right, top: top }}>
        <div className="pane top-left"></div>
        <div className="pane top-right"></div>
        <div className="pane bottom-left"></div>
        <div className="pane bottom-right"></div>
      </div>
    );
  } else {
    return (
      <>
        <h1>ERROR: WINDOW NEEDS POSITION</h1>
      </>
    );
  }
}

export default Window;
