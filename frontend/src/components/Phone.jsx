import "../static/css/Phone.css";

function Phone({ phoneHeading, options, phoneText, style }) {
  if (Object.keys(options).length === 0) {
    return (
      <>
        <div id="phone">
          <p className="phone-heading">{phoneHeading}</p>
          <p className="phone-text">{phoneText}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div id="phone" style={style}>
        <p className="phone-heading">{phoneHeading}</p>
        {Object.keys(options).map((optionKey) => (
          <div
            key={optionKey}
            className="option"
            onClick={() => options[optionKey][1](optionKey)}
          >
            {options[optionKey][0]}
          </div>
        ))}
      </div>
    </>
  );
}

export default Phone;
