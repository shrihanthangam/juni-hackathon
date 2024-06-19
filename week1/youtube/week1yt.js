function lightenScreen() {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 1)"; // Start with opaque
    overlay.style.zIndex = "9999"; // Ensure it's on top of other elements
    document.body.appendChild(overlay);

    // Animate the opacity gradually
    let opacity = 1;
    const interval = setInterval(() => {
      opacity -= 0.05; // Adjust the decrement value for speed of lightening
      overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

      if (opacity <= 0) {
        overlay.style.backgroundColor = `rgba(0, 0, 0, 0)`;
        clearInterval(interval);
        resolve();
      }
    }, 50); // Adjust the interval time for smoothness
  });
}

let min = 5;
let max = 10;
let goDown = false;
let stop = false;
let startYapping = false;
let hasWrittenText = false; // Flag to ensure writeText happens only once

// Promise-based writeText function
function writeText(allText, wait_time) {
  return new Promise((resolve) => {
    let counter = 0;
    const text = document.getElementById("computer-text");
    const interval = setInterval(() => {
      if (counter >= allText.length) {
        text.innerText = allText;
        clearInterval(interval);
        resolve();
      } else {
        text.innerText = allText.substring(0, counter) + " |";
        counter += 1;
      }
    }, wait_time);
  });
}

// Promise-based delay function
function delay(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

async function moveThumbnailsLeft() {
  const interval = setInterval(async () => {
    if (!stop) {
      if (goDown) {
        max -= 0.5;
        min -= 0.5;
      } else {
        max += 0.25;
        min += 0.25;

        if (min < 0) {
          console.log("one time");
          stop = true;
        }
      }

      // Move thumbnails
      let thumbnails = document.getElementsByClassName("video");
      for (let i = 0; i < thumbnails.length; i++) {
        let curPos = parseInt(thumbnails[i].style.left, 10);
        if (curPos) {
          if (curPos >= 1500 && !hasWrittenText) {
            startYapping = true;
            clearInterval(interval);

            // Wait for the first writeText to complete
            await writeText(". . .", 1000);

            // Wait for an additional 1 second
            await delay(1000);

            const text = document.getElementById("computer-text");

            text.style.width = "200px";
            text.style.position = "absolute";
            text.style.top = "75px";
            text.style.left = "0px";
            text.style.margin = "15px";
            text.style.fontSize = "22px";

            // Wait for the second writeText to complete
            await writeText("helelllo", 100);

            // Set the flag to true to prevent further executions
            hasWrittenText = true;
          }

          thumbnails[i].style.left = `${
            curPos - (Math.random() * (max - min) + min)
          }px`;

          if (curPos <= 0) {
            thumbnails[i].style.left = `${600 + max}px`;
          }
        } else {
          let new_width = Math.random() * 50 + 150;
          thumbnails[i].style.width = `${new_width}px`;
          thumbnails[i].style.left = `${600 + max}px`;
        }
      }

      if (max > 75) {
        goDown = true;
      }
    }
  }, 5);
}

document.addEventListener("DOMContentLoaded", async function () {
  await lightenScreen();

  const notification = document.getElementById("notification");
  const closeButton = notification.querySelector(".close");
  let isHovered = false;
  let isVisible = false;
  let notiForeverGone = false;

  function toggleNotification() {
    if (notiForeverGone) {
      notification.style.display = "none";
    } else {
      console.log(isHovered, isVisible);
      if (isHovered) {
        isVisible = true;
        notification.style.display = "block";
      }
      if (!isHovered) {
        isVisible = !isVisible;
        notification.style.display = isVisible ? "block" : "none";
      }
    }
  }

  closeButton.addEventListener("click", function () {
    isVisible = false;
    notiForeverGone = true;
    notification.style.display = "none";
  });

  notification.addEventListener("mouseover", function () {
    isHovered = true;
  });

  notification.addEventListener("mouseout", function () {
    isHovered = false;
  });

  setInterval(toggleNotification, 1500);
  moveThumbnailsLeft();
});
