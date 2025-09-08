// A list of your video filenames.
// You must change these to match the names of the files you uploaded to your assets folder.
const videoFiles = ["miami.mp4", "green.mp4", "sunset.mp4"];

function setRandomVideo() {
  // Select a random video filename from the array.
  const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];

  // Construct the full URL for the video.
  const videoUrl = `/assets/${randomVideo}`;

  // Get the video element from the HTML.
  const videoElement = document.getElementById("video-background");

  // Set the source of the video element to the random URL.
  videoElement.src = videoUrl;

  // This line is optional but ensures the video plays.
  videoElement.play();
}

// Set a random video when the page first loads.
setRandomVideo();
