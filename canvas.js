import Ufo from "./ufo.js";
import Grass from "./grass.js";

// Setting up the canvas
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.height = 500;
canvas.width = 800;

// FPS counter
var fps = 0;
var framesThisSecond = 0;

setInterval(() => {
  fps = framesThisSecond;
  framesThisSecond = 0;
}, 1000);

// Create ufo and grass
var ufo = new Ufo(c, canvas.width / 2, canvas.height / 4, 0.2);

var grassArray = [];
var grassArray2 = [];
var posX = 0;
for (var i = 0; i < 300; i++) {
  grassArray[i] = new Grass(c, posX, canvas.height - 3);
  posX += 10;
}
posX = 5;
for (var i = 0; i < 300; i++) {
  grassArray2[i] = new Grass(c, posX, canvas.height + 15);
  posX += 10;
}

// Fixed time step, variable rendering
var frameCount = 0;

var lastFrameTimeMs = 0;
var timestep = 1000 / 144;
var delta = 0;

requestAnimationFrame(mainLoop);

// Game Loop
function mainLoop(timestamp) {
  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;

  while (delta >= timestep) {
    update(timestep);
    delta -= timestep;
  }
  draw();

  requestAnimationFrame(mainLoop);
}

function update(timestep) {
  ufo.update(timestep);
  grassArray.forEach((grass) => grass.update(timestep));

  // test optimization
  // if (frameCount < 100) {
  //   console.log("body position: " + ufo.x);
  // }
}

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.save();
  ufo.draw();
  c.restore();

  c.save();
  grassArray.forEach((grass) => grass.draw());
  grassArray2.forEach((grass) => grass.draw());
  c.restore();

  // Draw FPS counter
  c.save();
  c.fillStyle = "white";
  c.fillText("FPS: " + fps, 10, 10);
  ++framesThisSecond;
  c.restore();

  // test optimization
  ++frameCount;
  // if (frameCount < 100) {
  //   console.log("frame: " + frameCount);
  // }
}
