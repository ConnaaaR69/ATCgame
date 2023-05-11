//canvas Settings
const screenWidth = 500;
const screenHeight = 500;
//plane settings
const apWidth = 50;
const apHeight = 40;
const apTail = 20;
//scope inits
let selectedAircraft = null;
let airfield;
let missile;
let radar;
function setup() {
  createCanvas(screenWidth, screenHeight);
  background(200);
  rectMode(CENTER);
  angleMode(DEGREES);
  radar = new Radar();
  airfield = new AirField(screenWidth - (screenWidth * 0.1), screenHeight - (screenHeight * 0.1), 10);
}

function draw() {
  background(0);
  radar.update()

  
 
  if (missile) {
    // calculate the direction to the aircraft object
    if (selectedAircraft != null || selectedAircraft != undefined) {
      let aircraft = airfield.planes[selectedAircraft];
      if (aircraft == undefined) return;
      // if (aircraft.velocity.mag() > 0) {
      //   let dir = p5.Vector.sub(createVector(aircraft.pos, missile.pos));
      //   // dir.normalize();
      //   let force = dir.mult(100);
      //   missile.applyForce(force);
      // }
      missile.update();
      missile.show();
    }
  }
  airfield.flyPlanes(); 

 

}

function mouseClicked() {
  // create a new missile object
  missile = new Missile(mouseX, mouseY);
}

function keyPressed() { 
  if (keyCode >= 48 && keyCode <= 57) {
    selectedAircraft = keyCode - 48;  
  }

  if(airfield.planes[selectedAircraft] != undefined) {
    
    if (keyCode === UP_ARROW ) {
      faster(selectedAircraft);
    }
    if (keyCode === DOWN_ARROW ) {
      slower(selectedAircraft);
    }
    if (keyCode === LEFT_ARROW ) {
      turnLeft(selectedAircraft);
    }
    if (keyCode === RIGHT_ARROW ) {
      turnRight(selectedAircraft);
    }
    if (keyCode === 72 ) {
      hover(selectedAircraft);
    }
    if (keyCode === 71 ) {
      unHover(selectedAircraft);
    }
    if (keyCode === 81 )  {
      selectedAircraft = undefined;
    }
  }
}

// Util functions
function hover(int) {
  if (airfield.planes[int] instanceof Helicopter) {
    airfield.planes[int].hover();
  } else {
    console.log("Fixed wing aircraft can\'t hover, silly...");
  }
}
function unHover(int) {
  if (airfield.planes[int] instanceof Helicopter) {
    airfield.planes[int].unHover();
  } else {
    console.log("Fixed wing aircraft can\'t hover, silly...");
  }
}


function faster(int) {
  airfield.planes[int].faster();
}
function slower(int) {
  airfield.planes[int].slower();
}
function turnLeft(int = selectedAircraft) {
  airfield.planes[int].turnLeft();
}
function turnRight(int = selectedAircraft) {
  airfield.planes[int].turnRight();
}