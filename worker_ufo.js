addEventListener("message", (event) => {
  var e = event.data;
  delete e.c;

  // Update body position
  if (e.x - 80 < 0 || e.x + 80 > e.yeet) {
    e.dx = -e.dx;
  }

  e.lastPosX = e.x;
  e.x += e.dx * e.delta;

  // Update tractor beam position
  if (e.beamLeftX > -100 || e.beamLeftX < -300) {
    e.beamLeftX_velocity = -e.beamLeftX_velocity;
  }
  if (e.beamRightX < 100 || e.beamRightX > 300) {
    e.beamRightX_velocity = -e.beamRightX_velocity;
  }

  e.lastBeamLeft = e.beamLeftX;
  e.lastBeamRight = e.beamRightX;
  e.beamLeftX += e.beamLeftX_velocity * e.delta;
  e.beamRightX += e.beamRightX_velocity * e.delta;

  // Update lights
  if (e.lightSize < 5 || e.lightSize > 8) {
    e.lightScaling = -e.lightScaling;
  }

  e.lightSize += e.lightScaling;

  // Update legs
  var legLimit = (40 * Math.PI) / 180;
  var legLimit2 = (20 * Math.PI) / 180;
  if (e.leftLegRot > legLimit || e.leftLegRot < legLimit2) {
    e.leftRotSpeed = -e.leftRotSpeed;
  }
  if (e.rightLegRot < -legLimit || e.rightLegRot > -legLimit2) {
    e.rightRotSpeed = -e.rightRotSpeed;
  }

  e.lastLeftRot = e.leftLegRot;
  e.lastRightRot = e.rightLegRot;
  e.rightLegRot += e.rightRotSpeed * e.delta;
  e.leftLegRot += e.leftRotSpeed * e.delta;

  postMessage(e);
});
