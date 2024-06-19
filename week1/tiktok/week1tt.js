function lightenScreen() {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 1)"; // Start with transparent
  overlay.style.zIndex = "9999"; // Ensure it's on top of other elements
  document.body.appendChild(overlay);

  // Animate the opacity gradually
  let opacity = 1;
  const interval = setInterval(() => {
    opacity -= 0.05; // Adjust the increment value for speed of dimming
    overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

    if (opacity <= 0) {
      overlay.style.backgroundColor = `rgba(0, 0, 0, 0)`;
      // Adjust the final opacity value as needed
      clearInterval(interval);
    }
  }, 50); // Adjust the interval time for smoothness
}

let counter = 0;
let allText =
  "\n\nwow! you decided to scroll. you are being very\n\nproductive. it must be sooooooo hard. instead of\n\nactually working and you know... getting better\n\nyou decided to work out your thumb muscles\n\nand scroll. You just wasted 3 hours and feel\n\nhorrible. Good job!";
const text = document.getElementById("phone-text");

function writeText() {
  const interval = setInterval(() => {
    if (counter >= allText.length) {
      text.innerText = allText;
      clearInterval(interval);
    } else {
      text.innerText = allText.substring(0, counter) + " |";
      counter += 1;
    }
  }, 100);
}

document.addEventListener("DOMContentLoaded", function () {
  lightenScreen();

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

  writeText();
  setInterval(toggleNotification, 1500);
});
