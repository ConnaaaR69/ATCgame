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
let radar;

function setup() {
  createCanvas(screenWidth, screenHeight);
  background(200);
  rectMode(CENTER);
  angleMode(DEGREES);
  radar = new Radar();
  airfield = new AirField(screenWidth - (screenWidth * 0.1), screenHeight - (screenHeight * 0.1), 5);
}

function draw() {
  background(0);
  radar.update();
  airfield.flyPlanes();
}

function keyPressed() {
  const aircraft = airfield.planes[selectedAircraft];
  
  if (keyCode >= 48 && keyCode <= 57) {
    selectedAircraft = keyCode - 48;
  } else if (aircraft) {
    switch (keyCode) {
      case UP_ARROW:
        faster(selectedAircraft);
        break;
      case DOWN_ARROW:
        slower(selectedAircraft);
        break;
      case LEFT_ARROW:
        turnLeft(selectedAircraft);
        break;
      case RIGHT_ARROW:
        turnRight(selectedAircraft);
        break;
      case 72:
        hover(selectedAircraft);
        break;
      case 71:
        unHover(selectedAircraft);
        break;
      case 81:
        selectedAircraft = undefined;
        break;
    }
  }
}

// Util functions
function hover(int) {
  if (!airfield.planes[int] instanceof Helicopter) {
    console.log("Fixed wing aircraft can\'t hover, silly...");
    return;
  }
  airfield.planes[int].hover();
}

function unHover(int) {
  if (!airfield.planes[int] instanceof Helicopter) {
    console.log("Fixed wing aircraft can\'t hover, silly...");
    return;
  }
  airfield.planes[int].unHover();
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