import "../static/css/Window.css";

function Window({ left, top }) {
  return (
    <div className="window" style={{ left: left, top: top }}>
      <div className="pane top-left"></div>
      <div className="pane top-right"></div>
      <div className="pane bottom-left"></div>
      <div className="pane bottom-right"></div>
    </div>
  );
}

export default Window;
