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
  } catch (error) {
    console.log(error);
  }
}
