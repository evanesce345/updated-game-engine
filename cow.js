export default function Cow(context, x, y) {
  this.c = context;

  this.x = x;
  this.y = y;
  this.dx = 0;
}

Cow.prototype.drawBody = function () {
  this.c.beginPath();
  this.c.ellipse(0, 0, 30, 20, 0, 0, 2 * Math.PI);
  this.c.strokeStyle = "black";
  this.c.stroke();
  this.c.fillStyle = "white";
  this.c.fill();

  this.c.beginPath();
  this.c.arc(-5, -10, 10, 0, 2 * Math.PI);
  this.c.fillStyle = "black";
  this.c.fill();
};

Cow.prototype.draw = function (interp) {
  this.c.translate(this.x, this.y);

  // Draw body
  this.drawBody();
};

Cow.prototype.update = function (delta) {
  if (this.x - 30 < 0) {
    this.x = 35;
  }
  if (this.x + 30 > this.c.canvas.clientWidth) {
    this.x = this.c.canvas.clientWidth - 35;
  }

  this.x += this.dx * delta;
};
