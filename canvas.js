import Ufo from "./ufo.js";
import Grass from "./grass.js";

var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.height = 500;
canvas.width = 800;

var ufo = new Ufo(c, canvas.width / 2, canvas.height / 4, 1);

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

// Game Loop
function mainLoop() {
  update();
  draw();

  requestAnimationFrame(mainLoop);
}

function update() {
  ufo.update();
  grassArray.forEach((grass) => grass.update());
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
}

mainLoop();
