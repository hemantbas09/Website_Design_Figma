const tableBody = document.querySelector("#tablebody");
const sidebarElement = document.getElementById('sidebar')
const hamburgerMenu = document.getElementById('Hamburger-menu')
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
const textarea = document.getElementById("textarea-container")
const profileimageElement = document.getElementById("profile-imageElement")

// Extract the data from the local storage and change into json Object:
const localStorageData = localStorage.getItem("personaldetailsArray")
const personalDetails = JSON.parse(localStorageData);

// find the url of the page and extract id:
let ulrPath = window.location.href
let id = ulrPath.split("?")[1]

// Hamburger Menu:
hamburgerMenu.addEventListener('click', (e) => {
  if (sidebarElement.style.display === 'none') {
    sidebarElement.style.display = 'block';
  } else {
    sidebarElement.style.display = 'none';
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) {
    sidebarElement.style.display = 'block';
  } else {
    sidebarElement.style.display = 'none';
  }
});

// Create:
if (profilePicture) {

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
      imageURL = reader.result
      profileimageElement.src = imageURL;
    }
  })

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // create a object:
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

    // add data in the array:
    dataArray.push(personaldetails);

    // Convert array to the string:
    const dataArrayString = JSON.stringify(dataArray);

    // store in the local storage
    localStorage.setItem("personaldetailsArray", dataArrayString);

    form.reset();

    window.location.href = 'dashboard.html'


  });
}

// Read:
if (tableBody) {
  for (let i = 0; i < personalDetails.length; i++) {
    const data = personalDetails[i];
    let row = `<tr>
                  <td class="table-col">
                      <div class="table-titlebox">
                        <input class="table-chechkbox thead-checkbox" type="checkbox">
                        <div class="profile-image-wrapper">
                            <img class="profile-image" src=${data.profilePicture} alt="profile">
                        </div>
                        <div>
                          <h2 class="table-title">${data.firstName} ${data.lastName}</h2>
                          <h3 id="checkmate" class="company-about">${data.email}</h3>
                        </div>
                      </div>
                    </td>
                    <td class="table-col">
                      <div class="progressive-box">
                        <div class="progressive-bar "></div>
                      </div>
                    </td>
                    <td>
                      <p class="status">${data.role}</p>
  
                    </td>
                    <td class="table-col">
                      <div class="avatars">
                        <div class="avatar">
                          <img class="img-avatar" src="../SidebarIcon/profile-picture.jpg" alt="user-avatar">
                        </div>
                        <div class="avatar">
                          <img class="img-avatar" src="../SidebarIcon/profile-picture.jpg" alt="user-avatar">
                        </div>
                        <div class="avatar">
                          <img class="img-avatar" src="../SidebarIcon/profile-picture.jpg" alt="user-avatar">
                        </div>
                        <div class="avatar">
                          <img class="img-avatar" src="../SidebarIcon/profile-picture.jpg" alt="user-avatar">
                        </div>
                        <div class="avatar">
                          <span class="avatar-number">+8</span>
  
                        </div>
                    </td>
                    <td>
                      <p class="company-about company-info">
                      ${data.country}
                      </p>
                    </td>
                    <td>
                      <p class="company-about company-info">
                      ${data.timezone}
                      </p>
                    </td>
                    <td>
                      <p class="company-about company-info">
                      ${data.bio}
                      </p>
  
                    </td>
                    <td class=" table-col">
                      <div class="table-act-btn">
                        <button class="nostyle-btn" onclick="deleteData(${i})">
                          <img src="../Image/delete-icon.svg"   alt="delete-icon">
                        </button>
  
                        <a href="./formedit.html?${id = i}">
                          <img src="../Image/edit-icon.svg" alt="edit-icon">
                       </a>                      
                      </div>
  
                    </td>
                  </tr>`
    tableBody.innerHTML += row
  }
}

//Delete:
function deleteData(id) {
  if (confirm("Are you sure?")) {
    let personalDetails = JSON.parse(localStorage.getItem("personaldetailsArray"));
    personalDetails.splice(id, 1);
    localStorage.setItem("personaldetailsArray", JSON.stringify(personalDetails));
    window.location.reload();
  } else {
    alert("Wait a minute, who are you?");
  }
}
