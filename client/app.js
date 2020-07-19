const submitBtn = document.getElementById("submit");
const form = document.getElementById("form");

submitBtn.addEventListener("click", fetchResult);

async function fetchResult(e) {
  e.preventDefault();
  const fData = new FormData(form);
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
    // uiAlert("Image Uploaded", "alert alert-light");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...Try again",
      text: error,
    });
    // uiAlert("Image Not Uploaded", "alert alert-danger");
  }
}

// function uiAlert(message, className) {
//   let div = document.createElement("div");
//   div.className = className;
//   div.appendChild(document.createTextNode(message));
//   let container = document.querySelector(".uicontainer");
//   let parent = document.querySelector("#form");
//   container.insertBefore(div, parent);
//   setTimeout(function () {
//     document.querySelector(".alert").remove();
//   }, 3000);
// }
