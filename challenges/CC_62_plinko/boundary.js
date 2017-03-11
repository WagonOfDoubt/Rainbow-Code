// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Plinko
// Video 1: https://youtu.be/KakpnfDv_f0
// Video 2: https://youtu.be/6s4MJcUyaUE
// Video 3: https://youtu.be/jN-sW-SxNzk
// Video 4: https://youtu.be/CdBXmsrkaPs

function Boundary(x, y, w, h) {
  var options = {
    isStatic: true
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);
}

Boundary.prototype.show = function() {
  ambientMaterial(360, 100, 100);
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  box(this.w, this.h, 50);
  pop();
}
