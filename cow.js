export default function Cow(context, x, y) {
  this.c = context;

  this.x = x;
  this.y = y;
  this.dx = 0;

  this.bodyRadius = 30;
}

Cow.prototype.drawBody = function () {
  this.c.beginPath();
  this.c.ellipse(0, 0, this.bodyRadius, 20, 0, 0, 2 * Math.PI);
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
  if (this.x - this.bodyRadius < 0) {
    this.x = this.bodyRadius + 5;
  }
  if (this.x + this.bodyRadius > this.c.canvas.clientWidth) {
    this.x = this.c.canvas.clientWidth - (this.bodyRadius + 5);
  }

  this.x += this.dx * delta;
};
