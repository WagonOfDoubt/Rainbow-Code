// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Plinko
// Video 1: https://youtu.be/KakpnfDv_f0
// Video 2: https://youtu.be/6s4MJcUyaUE
// Video 3: https://youtu.be/jN-sW-SxNzk
// Video 4: https://youtu.be/CdBXmsrkaPs

// module aliases
var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var cols = 11;
var rows = 10;

function preload() {
  ding = loadSound('ding.mp3');
}

function setup() {
  createCanvas(600, 700, WEBGL);
  colorMode(HSB);
  engine = Engine.create();
  world = engine.world;
  //world.gravity.y = 2;

  function collision(event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
      var labelA = pairs[i].bodyA.label;
      var labelB = pairs[i].bodyB.label;
      if (labelA == 'particle' && labelB == 'plinko') {
        //ding.play();
      }
      if (labelA == 'plinko' && labelB == 'particle') {
        //ding.play();
      }
    }
  }

  Events.on(engine, 'collisionStart', collision);

  newParticle();
  var spacing = width / cols;
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var x = i * spacing;
      if (j % 2 == 0) {
        x += spacing / 2;
      } else if (i === 0) {
        continue;
      }
      var y = spacing + j * spacing;
      var p = new Plinko(x, y, 16);
      plinkos.push(p);
    }
  }

  // bottom boundary
  var b = new Boundary(width / 2, height + 50, width + 200, 100);
  bounds.push(b);
  // left boundary
  b = new Boundary(-50, height / 2, 100, height);
  bounds.push(b);
  // left boundary
  b = new Boundary(width + 50, height / 2, 100, height);
  bounds.push(b);

  for (var i = 1; i < cols; i++) {
    var x = i * spacing;
    var h = 100;
    var w = 10;
    var y = height - h / 2;
    var b = new Boundary(x, y, w, h);
    bounds.push(b);

  }


}

function newParticle() {
  var p = new Particle(300 + random(-2, 2), -200, 10);
  particles.push(p);
}

function draw() {
  background(0, 0, 0);

  var locY = (mouseY / height - 0.5) * 2;
  var locX = (mouseX / width - 0.5) * 2;

  ambientLight(360, 0, 30);
  pointLight(360, 0, 70, locX, locY, 0);
  camera(locX * width / 2, locY * height / 2, 0);

  ambientMaterial(360, 30, 100);
  plane(width, height);
  translate (-width * 0.5, -height * 0.5);

  if (frameCount % 60 == 0) {
    newParticle();
  }
  Engine.update(engine, 1000 / 30);
  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
    if (particles[i].isOffScreen()) {
      World.remove(world, particles[i].body);
      particles.splice(i, 1);
      i--;
    }
  }
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].show();
  }
  for (var i = 0; i < bounds.length; i++) {
    bounds[i].show();
  }
}
