"use strict";

const openNav = document.getElementById("open-nav");
const closeNav = document.getElementById("close-nav");
const form = document.getElementById("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const profilePicture = document.getElementById("profile-picture");
const role = document.getElementById("role");
const country = document.querySelector("select[name='country']");
const timezone = document.querySelector("select[name='timezone']");
const textType = document.querySelector("select[name='text-type']");
const bio = document.getElementById("textarea");
const textCount = document.getElementById("text-count");
const textarea = document.getElementById("textarea-container");
const profileimageElement = document.getElementById("profile-imageElement");
const textBold = document.getElementById("font-bold");
const textItalic = document.getElementById("font-italic");
const sidebarElement = document.getElementById("sidebar");
const textUnorderList = document.getElementById("text-unorderlist");
const textOrderList = document.getElementById("text-orderlist");
const validationMessage = document.getElementById("validation-message");
const roleValidationMessage = document.getElementById(
  "role-validation-message"
);

// Hamburger Menu event listeners
openNav.addEventListener("click", function () {
  sidebarElement.style.display = "block";
  header.style.display = "none";
  dashboard.style.setProperty("--navColor", "rgba(181, 178, 178, 0.2)");
  dashboard.style.position = "fixed";
});

closeNav.addEventListener("click", function () {
  sidebarElement.style.display = "none";
  header.style.display = "block";
  dashboard.style.setProperty("--navColor", "transparent");
  dashboard.style.position = "relative";
});

// Resize event listener for responsive behavior
window.addEventListener("resize", function () {
  if (window.innerWidth > 1024) {
    sidebarElement.style.display = "block";
    dashboard.style.setProperty("--navColor", "transparent");
    dashboard.style.position = "relative";
    header.style.display = "none";
  } else {
    sidebarElement.style.display = "none";
    header.style.display = "block";
  }
});

let imageURL;
profilePicture.addEventListener("change", (e) => {
  // Access the Selected Files:
  let selectedImage = e.target.files[0];

  // Create a instance of the FileReader:
  let reader = new FileReader();

  // Read the selected file as a data URL---> readAsDataURL represent the file data as base64 encoded string:
  reader.readAsDataURL(selectedImage);

  // create the reader callback function:
  reader.onload = function () {
    // Update the source of the image:
    imageURL = reader.result;
    profileimageElement.src = imageURL;
  };
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const personaldetails = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    profilePicture: imageURL,
    role: role.value,
    country: country.value,
    timezone: timezone.value,
    bio: bio.value,
    textType: textType.value,
  };

  // Check if the data is existing in the local storage or not:
  const existingData = localStorage.getItem("personaldetailsArray");

  let dataArray;

  // if existing data found in the local storage parse the existing data otherwise create new array:
  if (existingData) {
    // convert string into object
    dataArray = JSON.parse(existingData);
  } else {
    dataArray = [];
  }
  // add other data in the array:
  dataArray.push(personaldetails);

  // Convert array to the string:
  const dataArrayString = JSON.stringify(dataArray);

  // store in the local storage
  localStorage.setItem("personaldetailsArray", dataArrayString);

  form.reset();

  window.location.href = "dashboard.html";
});

// Count the input text in the Bio Text area:
bio.addEventListener("input", (e) => {
  let maximumCharacter = 275;
  console.log(e);
  let useDescriptionLength = bio.value.length;
  let characterLeft = maximumCharacter - useDescriptionLength;
  textCount.innerHTML = characterLeft;
  console.log(characterLeft);
});

// make Bold input text in the Bio Text area:
let isClick = true;
textBold.addEventListener("click", () => {
  isClick === true
    ? (bio.style.fontWeight = "900")
    : (bio.style.fontWeight = "500");
  isClick = !isClick;
});

// make Italic input text in the Bio Text area:
textItalic.addEventListener("click", () => {
  isClick === true
    ? (bio.style.fontStyle = "Italic")
    : (bio.style.fontStyle = "");
  isClick = !isClick;
});

// make Italic input text in the Bio Text area:
textUnorderList.addEventListener("click", () => {
  bio.style.background = "green";
});

// make Italic input text in the Bio Text area:
textOrderList.addEventListener("click", () => {
  bio.style.background = "pink";
});

firstName.addEventListener("input", () => {
  if (!firstName.value) {
    validationMessage.style.opacity = 0;
  } else if (!/^[a-zA-Z]+$/.test(firstName.value)) {
    validationMessage.style.opacity = 1;
  }
});

lastName.addEventListener("input", () => {
  if (!lastName.value) {
    validationMessage.style.opacity = 0;
  } else if (!/^[a-zA-Z]+$/.test(lastName.value)) {
    validationMessage.style.opacity = 1;
  }
});

role.addEventListener("input", () => {
  if (!role.value) {
    roleValidationMessage.style.opacity = 0;
  } else if (!/^[a-zA-Z]+$/.test(role.value)) {
    roleValidationMessage.style.opacity = 1;
  }
});
