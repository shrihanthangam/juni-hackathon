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

function blackOut() {
  const blackoutDiv = document.createElement("div");
  blackoutDiv.style.position = "fixed";
  blackoutDiv.style.top = "0";
  blackoutDiv.style.left = "0";
  blackoutDiv.style.width = "100%";
  blackoutDiv.style.height = "100%";
  blackoutDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  blackoutDiv.style.zIndex = "9999";
  document.body.appendChild(blackoutDiv);
}

function handleOptionClick(option) {
  filePath = "";

  switch (option) {
    case "tiktok":
      filePath = "tiktok/week1tt.html";
  }

  blackOut();

  setTimeout(() => {
    window.location.href = filePath;
  }, 500);
}
