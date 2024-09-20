export default function Grass(context, x, y) {
  this.x = x;
  this.y = y;
  this.c = context;

  this.rot = 0;
  this.rotSpeed = (0.03 * Math.PI) / 180;
}

Grass.prototype.draw = function () {
  this.c.save();
  this.c.translate(this.x, this.y);
  this.c.rotate(Math.PI);
  this.c.rotate(this.rot);

  this.c.beginPath();
  this.c.bezierCurveTo(5, 5, 5, 15, 5, 10);
  this.c.bezierCurveTo(5, 25, 5, 35, 0, 40);
  this.c.bezierCurveTo(-5, 35, -5, 25, -5, 20);
  this.c.bezierCurveTo(-5, 15, -5, 5, 0, 0);
  this.c.fillStyle = "#02e311";
  this.c.fill();
  this.c.restore();
};

Grass.prototype.update = function (delta) {
  var limit = (10 * Math.PI) / 180;
  if (this.rot < -limit || this.rot > limit) {
    this.rotSpeed = -this.rotSpeed;
  }

  this.rot += this.rotSpeed * delta;
};
