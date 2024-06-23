import "../static/css/Submit.css";

function Submit({ submitText, genStyle, submitFunction }) {
  return (
    <>
      <button
        id="submit"
        type="submit"
        style={genStyle}
        onClick={submitFunction}
      >
        {submitText}
      </button>
    </>
  );
}

export default Submit;
