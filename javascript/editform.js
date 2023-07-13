"use strict";

const sidebarElement = document.getElementById("sidebar");
const openNav = document.getElementById("open-nav");
const closeNav = document.getElementById("close-nav");
const form = document.querySelector("#form");
// access all the data from the backend:

const localStorageData = localStorage.getItem("personaldetailsArray");
const personalDetails = JSON.parse(localStorageData);

// get the url path of the update page:
let ulrPath = window.location.href;

// extract the the id from the url:
let id = ulrPath.split("?")[1];

// extract the data from the local storage bu using id:
let personalDetail = personalDetails[id];

const formHTML = `<div>
<div class="input-container setting-input-container bigscreen-name-section">
    <label class="label setting-label" for="name">Name</label>
    <div class="input-container-content setting-fullName">
        <input class="input secondary-input input-width-fixed" type="text" id="first-name"
            name="first-name" value="${personalDetail.firstName}">
        <input class="input secondary-input input-width-fixed" type="text" id="last-name"
            name="last-name" value="${personalDetail.lastName}">
    </div>
</div>


<div class="input-container setting-input-container">
    <label class="label setting-label" for="email">Email address</label>
    <div class="input-container-content ">
        <img class="search-icon" src="../Form/email.svg" alt="email-icon">
        <input class="input search secondary-input " type="email" id="email" name="email"
        value="${personalDetail.email}">
    </div>
</div>

<div class=" input-container setting-input-container">

    <div class=" upload-file-heading setting-label">
        <h2 class="label">Your photo</h2>
        <p class="text-standard">This will be displayed on your profile.</p>
    </div>


    <div class="input-container-content">
        <div class="formimage-container">
            <img id="profile-imageElement" src="${personalDetail.profilePicture}" alt="">
        </div>
        <div class="file-container ">


            <label class="file-content " for="profile-picture">
                <img  class="file-icon" src="../Form/upload.svg" alt="file-icon">
                <div class="text-standard">
                    <p> <span class="anchor-tag primary-anchor-tag"> Click to upload </span>
                        or
                        drag and drop </p>
                    <p>SVG, PNG, JPG or GIF (max.
                        800x400px)</p>
                </div>
            </label>

            <input class="input search secondary-input file" type="file"
                id="profile-picture" name="file">

        </div>
    </div>
</div>

<div class="input-container setting-input-container">
    <label class="label setting-label" for="role">Role</label>
    <input class="input secondary-input input-container-content" type="text"
        placeholder="Product Designer" id="role" value="${personalDetail.role}">
</div>

<div class="input-container setting-input-container">
    <label class="label setting-label " for="country">Country</label>

    <div class="select-dropdown-container input-container-content">
        <div class="select-dropdown">
            <img src="../Form/select-dropdown.svg" alt="">
        </div>
        <select class="input setting-input" name="country" id="country">
            <option value="Nepal" selected>Nepal</option>
            <option value="India">India</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Srilanka">Srilanka</option>
            <option value="China">China</option>
            <option value="England">England</option>
            <option value="Spain">Spain</option>
        </select>
    </div>
</div>


<div class="input-container setting-input-container">
    <label class="label setting-label" for="timzone">Timezone</label>
    <div class="select-dropdown-container input-container-content">
        <div class="select-dropdown">
            <img src="../Form/select-dropdown.svg" alt="">
        </div>
        <select class="input setting-input " name="timezone" id="timezone">
            <option value="UTC-08:00">UTC-08:00</option>
            <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
            <option value="America/Tijuana">Tijuana, Baja California</option>
            <option value="America/Dawson">Dawson</option>
            <option value="America/Phoenix">Arizona</option>
            <option value="America/Whitehorse">Whitehorse</option>
            <option value="America/Inuvik">Inuvik</option>
            <option value="America/Boise">Mountain Time (US & Canada)</option>
            <option value="America/Edmonton">Edmonton</option>
            <option value="America/Yellowknife">Yellowknife</option>
        </select>
    </div>
</div>

<div class=" input-container setting-input-container">
    <div class="setting-label">
        <h2 class="label">Bio</h2>
        <p class="text-standard">Write a short introduction.</p>
    </div>

    <div class="input-container-content">
        <div class="text-formatting-wrapper">
            <div class="input-container">
                <div class="select-dropdown-container input-container-content">
                    <div class="select-dropdown">
                        <img src="../Form/select-dropdown.svg" alt="">
                    </div>
                    <select class="input setting-input text-type" name="text-type"
                        id="text-type">
                        <option value="normaltext" selected>Normal Text</option>
                        <option value="bold">Bold</option>

                    </select>
                </div>
            </div>

            <div class="text-area-icon">
                <img src="../Form/bold.svg" alt="">
                <img src="../Form/italic.svg" alt="">
                <img src="../Form/save.svg" alt="">
                <img src="../Form/unorder-list.svg" alt="">
                <img src="../Form/oder-list.svg" alt="">
            </div>

        </div>
        <textarea class="input setting-input text-area setting-textarea" name="textarea"
            id="textarea" cols="10" rows="5">${personalDetail.bio}</textarea>
        <p class="text text-area-font">275 characters left</p>
    </div>
</div>

<div class=" input-container setting-input-container">
    <div class="project-upload-container setting-label">
        <h2 class="label">Portfolio projects</h2>
        <p class="text-standard">Share a few snippets of your work.</p>
    </div>
    <div class=" file-container input-container-content">


        <label class="file-content" for="project-file">
            <img class="file-icon" src="../Form/upload.svg" alt="file-icon">
            <div class="text-standard">
                <p> <span class="anchor-tag primary-anchor-tag"> Click to upload </span> or
                    drag
                    and drop </p>
                <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
        </label>

        <input class="input search secondary-input file" type="file" id="project-file"
            name="project-file">

    </div>
</div>
<div class="formcta-button">
    <button class="btn btn-outline">Cancel</button>
    <button id="submit-btn" type="submit" class="btn btn-primary">Save</button>
</div>
</div>`;

form.innerHTML += formHTML;

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const profilePicture = document.getElementById("profile-picture");
const role = document.getElementById("role");
const country = document.querySelector("select[name='country']");
const timezone = document.querySelector("select[name='timezone']");
const textType = document.querySelector("select[name='text-type']");
const bio = document.getElementById("textarea");
const profileimageElement = document.getElementById("profile-imageElement");

let imageURL;

profilePicture.addEventListener("change", (e) => {
  // Access the selected files:
  let selectedImage = e.target.files[0];

  if (selectedImage) {
    // Create an instance of the FileReader:
    let reader = new FileReader();

    // Read the selected file as a data URL:
    reader.readAsDataURL(selectedImage);

    // Create the reader callback function:
    reader.onload = function () {
      // Update the source of the image:
      imageURL = reader.result;
      profileimageElement.src = imageURL;
    };
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Change the existing value to update the data:
  personalDetail.firstName = firstName.value;
  personalDetail.lastName = lastName.value;
  personalDetail.email = email.value;
  personalDetail.profilePicture = imageURL || personalDetail.profilePicture;
  personalDetail.role = role.value;
  personalDetail.country = country.value;
  personalDetail.timezone = timezone.value;
  personalDetail.textType = textType.value;
  personalDetail.bio = bio.value;

  // Convert array to a string:
  const dataArrayString = JSON.stringify(personalDetails);

  // Store in the local storage:
  localStorage.setItem("personaldetailsArray", dataArrayString);

  window.location.href = "dashboard.html";
});

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
