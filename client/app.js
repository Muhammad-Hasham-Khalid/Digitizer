const submitBtn = document.getElementById("submit");
const form = document.getElementById("form");
let data;

submitBtn.addEventListener("click", fetchResult);

async function fetchResult(e) {
  e.preventDefault();
  console.log("Submitting form.");
  const fData = new FormData(form);
  try {
    data = await fetch("http://127.0.0.1:5000/", {
      method: "POST",
      body: fData,
    });
    const res = await data.text();
    console.log(res);
    uiAlert("Image Uploaded", "alert alert-light");
  } catch (error) {
    console.log(error);
    uiAlert("Image Not Uploaded", "alert alert-danger");
  }
}

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
