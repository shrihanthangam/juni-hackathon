import "../static/css/Border.css";

function Border({ content, bgColor }) {
  return (
    <>
      {bgColor ? (
        <div className="border" style={{ backgroundColor: bgColor }}>
          {content}
        </div>
      ) : (
        <div className="border">{content}</div>
      )}
    </>
  );
}

export default Border;
