let pixelData = null;
let isDrawn = false;

function setup() {
  const canvas = createCanvas(400, 400);
  cursor(CROSS);

  btnContainer = createDiv();
  btnContainer.addClass("container text-center p-3");

  // clearing the canvas
  eraser = createButton("Clear");
  eraser.id("eraser");
  eraser.mousePressed(changeBG);
  eraser.addClass("btn btn-primary btn-lg customButton");

  // checking the result
  submit = createButton("Check");
  submit.id("submit");
  submit.mousePressed(fetchResult);
  submit.addClass("btn btn-light btn-lg customButton");

  btnContainer.child("eraser");
  btnContainer.child("submit");

  background(0);
  colorMode(RGB);
}

async function fetchResult(e) {
  convertToImage();
  const fData = new FormData();
  if (isDrawn) {
    fData.append("pixels", pixelData);
    try {
      let data = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        body: fData,
      });
      const res = await data.text();
      if (res != "Error") {
        Swal.fire({
          icon: "success",
          title: "Result",
          text: `The number is predicted to be: ${res}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...Try again",
          text: res,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...Try again",
        text: error,
      });
    }
    changeBG();
  } else {
    uiAlert("Please draw something on the canvas", "alert alert-warning");
  }
}

// custom alert
function uiAlert(message, className) {
  let div = document.createElement("div");
  div.className = className;
  div.appendChild(document.createTextNode(message));
  let container = document.querySelector(".uicontainer");
  let parent = document.querySelector("#form");
  container.insertBefore(div, parent);
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
}

// saving canvas function
function convertToImage() {
  loadPixels();
  pixelData = Array.from(pixels);
  pixelData = JSON.stringify({ values: pixelData });
  updatePixels();
}

function mouseDragged() {
  isDrawn = true;
  stroke(color(255));
  strokeWeight(20);
  if (mouseX < 500) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

// erasing the canvas
function changeBG() {
  isDrawn = false;
  background(0);
}
