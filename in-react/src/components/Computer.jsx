import "../static/css/Computer.css";

import computer_img from "../static/images/computer.png";
import youtube_logo from "../static/images/youtube_logo.png";

function Computer({ videos, computerText, smallComputerText, style }) {
  if (videos.length == 2) {
    return (
      <>
        <div id="computer">
          <img className="computer-img" src={computer_img} />
          <img className="youtube-logo" src={youtube_logo} />

          <div id="videos">
            <img className="video" src={videos[0]} style={style[0]} />
            <img className="video" src={videos[1]} style={style[1]} />
          </div>

          <p id="computer-text">{computerText}</p>
          <p id="small-computer-text">{smallComputerText}</p>
        </div>
      </>
    );
  }
  if (videos.length == 4) {
    return (
      <>
        <div id="computer">
          <img className="computer-img" src={computer_img} />
          <img className="youtube-logo" src={youtube_logo} />

          <div id="videos">
            <img className="video" src={videos[0]} style={style[0]} />
            <img className="video" src={videos[1]} style={style[1]} />
            <img className="video" src={videos[2]} style={style[2]} />
            <img className="video" src={videos[3]} style={style[3]} />
          </div>

          <p id="computer-text">{computerText}</p>
          <p id="small-computer-text">{smallComputerText}</p>
        </div>
      </>
    );
  }
}

export default Computer;
