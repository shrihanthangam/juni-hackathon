import "../static/css/Window.css";

function Window({ left, top }) {
  return (
    <>
      <div className="window" style={{ left: left, top: top }}></div>
    </>
  );
}

export default Window;
