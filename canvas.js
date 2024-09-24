import Ufo from "./ufo.js";
import Grass from "./grass.js";
import Cow from "./cow.js";
import collisionUpdate from "./collision_detection.js";

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

// Create ufo and grass and cow
var ufo = new Ufo(c, canvas.width / 2, canvas.height / 4, 0.2);
var cow = new Cow(c, 50, canvas.height - 80);

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

// Game Loop
function mainLoop(timestamp) {
  processInput();

  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;

  while (delta >= timestep) {
    update(timestep);
    delta -= timestep;
  }
  draw(delta / timestep);

  requestAnimationFrame(mainLoop);
}

// Input processing
var keysdown = {
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
};

window.addEventListener(
  "keydown",
  (e) => {
    if (e.defaultPrevented) {
      return;
    }

    switch (e.key) {
      case "d":
        keysdown.right.pressed = true;
        break;
      case "D":
        keysdown.right.pressed = true;
        break;
      case "a":
        keysdown.left.pressed = true;
        break;
      case "A":
        keysdown.left.pressed = true;
        break;
    }

    e.preventDefault();
  },
  true
);

window.addEventListener(
  "keyup",
  (e) => {
    if (e.defaultPrevented) {
      return;
    }

    switch (e.key) {
      case "d":
        keysdown.right.pressed = false;
        break;
      case "D":
        keysdown.right.pressed = false;
        break;
      case "a":
        keysdown.left.pressed = false;
        break;
      case "A":
        keysdown.left.pressed = false;
        break;
    }

    e.preventDefault();
  },
  true
);

function processInput() {
  if (keysdown.right.pressed) {
    cow.dx = 0.5;
  } else if (keysdown.left.pressed) {
    cow.dx = -0.5;
  } else cow.dx = 0;
}

function update(timestep) {
  ufo.update(timestep);
  cow.update(timestep);
  grassArray.forEach((grass) => grass.update(timestep));
  collisionUpdate(ufo, cow, c);

  // test optimization
  // if (frameCount < 100) {
  //   console.log("body position: " + ufo.x);
  // }
}

function draw(interp) {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.save();
  ufo.draw(interp);
  c.restore();

  c.save();
  grassArray.forEach((grass) => grass.draw(interp));
  grassArray2.forEach((grass) => grass.draw(interp));
  c.restore();

  c.save();
  cow.draw(interp);
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

requestAnimationFrame(mainLoop);
