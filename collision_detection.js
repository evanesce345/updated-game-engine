export default function collisionUpdate(ufo, cow, collisionOn) {
  if (!collisionOn) {
    return;
  }
  if (
    getDistance(cow.x, cow.y, ufo.x + ufo.beamLeftX + 50, cow.y) <
      cow.bodyRadius ||
    getDistance(cow.x, cow.y, ufo.x + ufo.beamRightX - 50, cow.y) <
      cow.bodyRadius
  ) {
    return true;
  } else {
    return false;
  }
}

function getDistance(x1, y1, x2, y2) {
  var xDistance = x2 - x1;
  var yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
