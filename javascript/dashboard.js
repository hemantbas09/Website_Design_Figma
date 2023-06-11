const localStorageData = localStorage.getItem("personaldetailsArray")
const personalDetails = JSON.parse(localStorageData);
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
const textCount = document.getElementById("text-count")
const textarea = document.getElementById("textarea-container")
const profileimageElement = document.getElementById("profile-imageElement")
const textBold = document.getElementById("font-bold")
const textItalic = document.getElementById("font-italic")

// Retrive the data to the table:
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

// Delete the data:
const deleteData = (id) => {

  if (confirm("Are you sure") === true) {
    let data = personalDetails.splice(id, 1)
    let personalDetail = JSON.stringify(personalDetails);
    localStorage.setItem("personaldetailsArray", personalDetail)
    window.location.reload();
  }
  else {
    alert("Wait a Minute Who are You")
  }

}

//----------------- For hamburger menu active---------------------:

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

//-------------Create--------------------





