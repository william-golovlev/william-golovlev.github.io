// A list of your video filenames.
// Now using full URLs from Cloudinary.
const videoFiles = [
  "https://res.cloudinary.com/dikzytnwj/video/upload/v1757377343/green_jxjkus.mp4",
  "https://res.cloudinary.com/dikzytnwj/video/upload/v1757377345/Sunset_jlxpyw.mp4",
  "https://res.cloudinary.com/dikzytnwj/video/upload/v1757377342/florida_wjc3i9.mp4",
];

function setRandomVideo() {
  // Select a random video filename from the array.
  const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];

  // Construct the full URL for the video.
  // We no longer need this line as the full URL is already in the array.
  // const videoUrl = `/assets/${randomVideo}`;

  // Get the video element from the HTML.
  const videoElement = document.getElementById("video-background");

  // Set the source of the video element to the random URL.
  videoElement.src = randomVideo;

  // This line is optional but ensures the video plays.
  videoElement.play();
}

// Set a random video when the page first loads.
setRandomVideo();
