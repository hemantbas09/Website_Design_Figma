"use stric"

const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // access all the data from the backend:
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const profilePicture = document.getElementById("profile-picture").value;
  const role = document.getElementById("role").value;
  const country = document.querySelector("select[name='country']").value;
  const timezone = document.querySelector("select[name='timezone']").value;
  const textType = document.querySelector("select[name='text-type']").value;
  const bio = document.getElementById("textarea").value;

  // store the data by making a object
  const personaldetails = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    profilePicture: profilePicture,
    role: role,
    country: country,
    timezone: timezone,
    bio: bio,
    textType: textType
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
});
