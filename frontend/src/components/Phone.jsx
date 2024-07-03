import React, { useState } from "react";
import "../static/css/Phone.css";

function Phone({ phoneHeading, options, phoneText, style, notiText }) {
  const [expanded, setExpanded] = useState(false);

  const handleOptionClick = (optionKey) => {
    options[optionKey][1](optionKey);
  };
  if (Object.keys(options).length > 0) {
    return (
      <>
        <div id="phone" style={style}>
          {/* <p className="phone-heading">{phoneHeading}</p> */}
          {/* <p className="phone-text">{phoneText}</p> */}
          <div
            className={`options ${expanded ? "expanded" : ""}`}
            onClick={() => setExpanded(!expanded)}
          >
            <div className="show">
              <img className="show-img" src="/pngs/show.png" alt="Show"></img>
              <p className="show-text">
                {notiText ? notiText : "Show Notifications"}
              </p>
            </div>

            {expanded ? (
              ""
            ) : (
              <>
                <div className="show-1"></div>
                <div className="show-2"></div>
              </>
            )}
            {Object.keys(options).map((optionKey) => (
              <div
                key={optionKey}
                className="option"
                onClick={() => handleOptionClick(optionKey)}
              >
                {options[optionKey][0]}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="phone" style={style}>
          <p className="phone-heading">{phoneHeading}</p>
          <p className="phone-text">{phoneText}</p>
        </div>
      </>
    );
  }
}

export default Phone;
