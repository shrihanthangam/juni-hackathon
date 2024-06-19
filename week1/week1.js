document.addEventListener("DOMContentLoaded", function () {
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
});

function darkenScreen() {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Start with transparent
  overlay.style.zIndex = "9999"; // Ensure it's on top of other elements
  document.body.appendChild(overlay);

  // Animate the opacity gradually
  let opacity = 0;
  const interval = setInterval(() => {
    opacity += 0.05; // Adjust the increment value for speed of dimming
    overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

    if (opacity >= 1) {
      // Adjust the final opacity value as needed
      clearInterval(interval);
    }
  }, 50); // Adjust the interval time for smoothness
}

function handleOptionClick(option) {
  filePath = "";

  switch (option) {
    case "tiktok":
      filePath = "tiktok/week1tt.html";
      break;
    case "youtube":
      filePath = "youtube/week1yt.html";
      break;
  }

  darkenScreen();

  setTimeout(() => {
    window.location.href = filePath;
  }, 1500);
}
