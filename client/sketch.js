var c;

function setup() {
  const canvas = createCanvas(400, 400);
  eraser = createButton("clear");
  eraser.mousePressed(changeBG);
  eraser.addClass("btn btn-primary btn-lg clearButton");
  saver = createButton("Saving Image");
  saver.mousePressed(convertToImage);
  c = color(0);
  background(255);
  colorMode(RGB);

  // saving canvas function
  function convertToImage() {
    saveCanvas(canvas, "image", "png");
    // loadPixels();
    // let data = Array.from(pixels);
    // console.log(data);
    // updatePixels();
  }

  // erasing the canvas
  function changeBG() {
    background(255);
  }
}

function mouseDragged() {
  stroke(c);
  strokeWeight(10);
  if (mouseX < 500) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
