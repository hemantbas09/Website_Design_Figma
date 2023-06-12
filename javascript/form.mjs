// "use strict"

// access all the html element:
const form = document.getElementById("form");
const editForm = document.getElementById("edit-form");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const profilePicture = document.getElementById("profile-picture");
const role = document.getElementById("role");
const country = document.querySelector("select[name='country']");
const timezone = document.querySelector("select[name='timezone']");
const textType = document.querySelector("select[name='text-type']");
const bio = document.getElementById("textarea");
const textCount = document.getElementById("text-count")
const textarea = document.getElementById("textarea-container")
const profileimageElement = document.getElementById("profile-imageElement")
const textBold = document.getElementById("font-bold")
const textItalic = document.getElementById("font-italic")
const sidebarElement = document.getElementById('sidebar')

// const textBold= document.getElementById("")

const textUnorderList = document.getElementById("text-unorderlist")

const textOrderList = document.getElementById("text-orderlist")


let imageURL;

profilePicture.addEventListener("change", (e) => {

  // Access the Selected Files:
  let selectedImage = e.target.files[0];
  console.log(e.target.files)
  // Create a instance of the FileReader:
  let reader = new FileReader();

  // Read the selected file as a data URL---> readAsDataURL represent the file data as base64 encoded string:
  reader.readAsDataURL(selectedImage);

  // create the reader callback function:
  reader.onload = function () {

    // Update the source of the image:
    imageURL = reader.result
    profileimageElement.src = imageURL;
  }
})



form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("This is profile picture path", profilePicture.value)
  // store the data by making a object
  // image.target.files[0]
  // console.log("this is what", imageUpload(image.target.files[0]))
  const personaldetails = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    profilePicture: imageURL,
    role: role.value,
    country: country.value,
    timezone: timezone.value,
    bio: bio.value,
    textType: textType.value
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

  window.location.href = 'dashboard.html'


});

bio.addEventListener("input", (e) => {
  let maximumCharacter = 275;
  console.log(e)
  let useDescriptionLength = (bio.value).length
  let characterLeft = maximumCharacter - useDescriptionLength
  textCount.innerHTML = characterLeft
  console.log(characterLeft)
})

// text bold:
let isClick = true;

textBold.addEventListener("click", () => {

  (isClick === true ? bio.style.fontWeight = "900" : bio.style.fontWeight = "500")
  isClick = !isClick
})

textItalic.addEventListener("click", () => {
  (isClick === true ? bio.style.fontStyle = "Italic" : bio.style.fontStyle = "")
  isClick = !isClick
})

textUnorderList.addEventListener("click", () => {
  bio.style.background = "green"

  // (isClick ? bio.style.background = "green" : bio.style.background = "green")

})

textOrderList.addEventListener("click", () => {
  bio.style.background = "pink"
})


let sidebarValue = true;
const mediaQuery = window.matchMedia('(max-width: 1024px)')
const sidebar = () => {

  (sidebarValue ?
    sidebarElement.style.display = 'block'
    :
    sidebarElement.style.display = 'none'
  )
  sidebarValue = !sidebarValue;
}

window.addEventListener('resize', (e) => {
  if (mediaQuery) {
    sidebarElement.style.display = 'block'
  }
});