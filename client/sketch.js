function setup() {
  const canvas = createCanvas(400, 400);
  eraser = createButton("clear");
  eraser.mousePressed(changeBG);
  eraser.addClass("btn btn-primary btn-lg clearButton");
  // saver = createButton("Saving Image");
  // saver.mousePressed(convertToImage);
  background(0);
  colorMode(RGB);

  // erasing the canvas
  function changeBG() {
    background(0);
  }
}

// saving canvas function
function convertToImage() {
  loadPixels();
  pixelData = Array.from(pixels);
  pixelData = JSON.stringify({ values: pixelData });
  console.log(pixelData);
  updatePixels();
}

function mouseDragged() {
  stroke(color(255));
  strokeWeight(20);
  if (mouseX < 500) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
