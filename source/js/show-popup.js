// code from https://codepen.io/captain_yar/details/OJMEmGw

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";

const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Get video ID
const vidId = document.getElementById("player").dataset.id;

// Build the player
let player;
let scrollPosition;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: vidId,
    events: {
      onReady: onPlayerReady
    }
  });
}

window.addEventListener("scroll", function () {
  scrollPosition = window.scrollY;
}, false);

// ==== Variables for popup
var modal = document.querySelector(".popup"),
  close = document.querySelector(".close-modal"),
  root = document.getElementsByTagName("html")[0];

// Do stuff when player is ready
function onPlayerReady(event) {
  document.querySelector(".watch__play").addEventListener("click", function () {
    modal.classList.add("popup__show");
    // Play video
    setTimeout(function () {
      event.target.playVideo();
    }, 100);
  });

  function closePopup() {
    modal.classList.remove("popup__show");
    root.classList.remove("no-scroll");
    window.scrollY = scrollPosition;

    event.target.pauseVideo();
  }

  // Close if outside box is clicked
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      closePopup();
    }
  });

  window.document.onkeydown = function (e) {
    if (!e) {
      e = event;
    }
    if (e.key === "Escape") {
      closePopup();
    }
  }

  // Close if close button is clicked
  close.addEventListener("click", function () {
    modal.classList.remove("popup__show");
    root.classList.remove("no-scroll");
    window.scrollY = scrollPosition;
    event.target.pauseVideo();
  });
}
