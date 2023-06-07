const localStorageData = localStorage.getItem("personaldetailsArray")
const personalDetails = JSON.parse(localStorageData);
const tableBody = document.querySelector("#tablebody");


console.log(tableBody)
// send data to the dashboard page:
for (let i = 0; i < personalDetails.length; i++) {
  const data = personalDetails[i];
  console.log(data.firstName)
  let row = `<tr>
                <td class="table-col">
                    <div class="table-titlebox">
                      <input class="table-chechkbox thead-checkbox" type="checkbox">
                      <img src=   ${data.profilePicture} alt="profile">
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
                    <p class="company-about">${data.bio}</p>
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

function check() {


}

// delete the data:
const deleteData = (id) => {

  if (confirm("Are you sure") === true) {
    let data = personalDetails.splice(id, 1)
    let personalDetail = JSON.stringify(personalDetails);
    localStorage.setItem("personaldetailsArray", personalDetail)
    window.location.reload();
  }
  else {
  
  }

}


