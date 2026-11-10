let racerXs = [30, 60,30,30];
let startY = 50;
let yStep = 60;
let finishX = 560;

function setup() {
  createCanvas(600, startY + yStep * racerXs.length);
}

function draw() {
  background(90,450,300);
  line(finishX, 0, finishX, height);
  for (let i = 0; i < racerXs.length; i++) {
    let y = startY + yStep * i;
    if (racerXs[i] < finishX) {
      racerXs[i] += random(1, 3);
    }else{
        racerXs=[30, 60, 30, 30];
    }
    circle(racerXs[i], y, 24);
    fill("yellow");
  }
}