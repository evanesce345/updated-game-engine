export default function collisionUpdate(ufo, cow, c) {
  if (
    getDistance(cow.x, cow.y, ufo.x + ufo.beamLeftX + 50, cow.y) <
      cow.bodyRadius ||
    getDistance(cow.x, cow.y, ufo.x + ufo.beamRightX - 50, cow.y) <
      cow.bodyRadius
  ) {
    ufo.beamStroke = "#ff0000";
    ufo.beamFill = "rgba(255, 0, 0, 0.3)";
    return false;
  } else {
    return true;
  }
}

function getDistance(x1, y1, x2, y2) {
  var xDistance = x2 - x1;
  var yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
