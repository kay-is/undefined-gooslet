console.log("Initializing", undefined, "gooselet v12...");
(function() {
  function makeThrowable(element) {
    let videoTime;
    const isVideo = element.nodeName == "VIDEO";
    if(isVideo) videoTime = element.currentTime;
    const jqElement = $(element);
    const clonedJqElement = jqElement.clone();
    jqElement.css("visibility", "hidden");
    clonedJqElement.css("z-index", 2147483647);
    clonedJqElement.insertBefore(jqElement);
    clonedJqElement.throwable({ bounce: 0.6, damping: 75 });
    if(isVideo) {
      const videoElement = clonedJqElement[0];
      videoElement.currentTime = videoTime;
      videoElement.removeAttribute("controls");
      videoElement.play();
    }
  }

  function isVisible(element) {
    const { display, visibility } = window.getComputedStyle(element, false);
    if (display == "none" || visibility == "hidden") return false;
    const { innerHeight, innerWidth } = window;
    const { bottom, left, right, top } = element.getBoundingClientRect();
    return (
      top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
    );
  }

  function hasBackgroundImage(element) {
    return window.getComputedStyle(element, false).backgroundImage.match(/url/);
  }

  function getValidDivs() {
    const validDivs = [...document.querySelectorAll("div")]
      .filter(isVisible)
      .filter(hasBackgroundImage);
    console.log(
      "Visible <div>s with background-image found: " + validDivs.length
    );
    return validDivs;
  }

  function getValidImgs() {
    const validImgs = [...document.querySelectorAll("img")].filter(isVisible);
    console.log("Visible <img>s found: " + validImgs.length);
    return validImgs;
  }
  
  function getValidVideos() {
    const validVideos = [...document.querySelectorAll("video")].filter(isVisible);
    console.log("Visible <video>s found: " + validVideos.length);
    return validVideos;
  }

  document.body.style.cursor = `url("https://kay-is.github.io/undefined-gooselet/goose.png"), default`;

  const honk = new Audio("https://kay-is.github.io/undefined-gooselet/honk.mp3");
  document.oncontextmenu = () => {
    honk.play();
    return false;
  };
  
  [...getValidDivs(), ...getValidImgs(), ...getValidVideos()].forEach(makeThrowable);

  console.log(undefined, "gooselet initialized!");
})();
