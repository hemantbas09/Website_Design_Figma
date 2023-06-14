// Get element references
const header = document.getElementById('header');
const tableBody = document.querySelector("#tablebody");
const sidebarElement = document.getElementById('sidebar');
const openNav = document.getElementById('open-nav');
const closeNav = document.getElementById('close-nav');
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
const textarea = document.getElementById("textarea-container");
const profileimageElement = document.getElementById("profile-imageElement");
const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const searchInput = document.getElementById("search");
const dashboard = document.getElementById("dashboard");
const totalUser = document.getElementById("total-user");
const currentPageElement = document.getElementById('current-page');
const totalPageElement = document.getElementById('total-page');
const mobileFirstName = document.getElementById('mobile-first-name');
const mobileLastName = document.getElementById('mobile-last-name')


// Get data from local storage and parse it
const localStorageData = localStorage.getItem("personaldetailsArray");
const personalDetails = JSON.parse(localStorageData) || [];

// Get the current URL and extract the ID
let ulrPath = window.location.href;
let id = ulrPath.split("?")[1];

// Hamburger Menu event listeners
openNav.addEventListener('click', function () {
  sidebarElement.style.display = 'block';
  header.style.display = 'none';
  dashboard.style.setProperty('--navColor', 'rgba(181, 178, 178, 0.2)');
  dashboard.style.position = 'fixed';
});

closeNav.addEventListener('click', function () {
  sidebarElement.style.display = 'none';
  header.style.display = 'block';
  dashboard.style.setProperty('--navColor', 'transparent');
  dashboard.style.position = 'relative';
});

// Resize event listener for responsive behavior
window.addEventListener('resize', function () {
  if (window.innerWidth > 1024) {
    sidebarElement.style.display = 'block';
    dashboard.style.setProperty('--navColor', 'transparent');
    dashboard.style.position = 'relative';
    header.style.display = 'none';
  } else {
    sidebarElement.style.display = 'none';
    header.style.display = 'block';
  }
});

// Profile picture change event listener
if (profilePicture) {
  let imageURL;

  profilePicture.addEventListener("change", (e) => {
    let selectedImage = e.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(selectedImage);

    reader.onload = function () {
      imageURL = reader.result;
      profileimageElement.src = imageURL;
    };
  });



  // Form submit event listener
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
        textType: textType.value
      };


  let dataArray = [];

  const existingData = localStorage.getItem("personaldetailsArray");
  if (existingData) {
    dataArray = JSON.parse(existingData);
  }

  dataArray.push(personaldetails);
  localStorage.setItem("personaldetailsArray", JSON.stringify(dataArray));

  form.reset();
  window.location.href = 'dashboard.html';
});
}

let currentPage = 1;
let numberPerPage = 2;
let totalPages;

// Previous button click event listener
previousBtn.addEventListener('click', (e) => {
  e.preventDefault();
  currentPage -= 1;
  updatePagination();
  currentPageElement.innerHTML = currentPage;
  totalPageElement.innerHTML = totalPages;
});

// Next button click event listener
nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  currentPage += 1;
  updatePagination();
  currentPageElement.innerHTML = currentPage;
  totalPageElement.innerHTML = totalPages;
});

// Update pagination based on current page
const updatePagination = () => {
  totalPages = Math.ceil(personalDetails.length / numberPerPage);
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  previousBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  renderTable();
};

let filterData = [];
let searchQuery;

// Search input event listener
searchInput.addEventListener("input", () => {
  filterData = [];
  searchQuery = searchInput.value.toLowerCase();
  personalDetails.forEach((personalDetail, index) => {
    let storeFirstName = `${personalDetail.firstName} ${personalDetail.lastName}`.toLowerCase();
    if (searchQuery && storeFirstName.includes(searchQuery)) {
      filterData.push(personalDetails[index]);
    }
  });
});

// Render table with data
function renderTable() {
  const startIndex = (currentPage - 1) * numberPerPage;
  const endIndex = startIndex + numberPerPage;
  let tableData = personalDetails.slice(startIndex, endIndex);
  let dataToDisplay = searchQuery ? filterData : tableData;

  currentPageElement.innerHTML = currentPage;
  totalPageElement.innerHTML = totalPages;

  if (dataToDisplay.length > 0) {
    tableBody.innerHTML = '';

    for (let i = 0; i < dataToDisplay.length; i++) {
      const data = dataToDisplay[i];
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

      tableBody.innerHTML += row;
    }
  } else {
    tableBody.innerHTML = '<tr><td colspan="6" class="empty-table">No data available</td></tr>';
  }
}

// Initial rendering of table
updatePagination();
searchInput.addEventListener('input', renderTable)


// Total user in the Table:
totalUser.innerHTML = personalDetails.length

// Delete the Data:
let deleteData = (id) => {
  if (confirm("Are you sure?")) {
    let personalDetails = JSON.parse(localStorage.getItem("personaldetailsArray"));
    personalDetails.splice(id, 1);
    localStorage.setItem("personaldetailsArray", JSON.stringify(personalDetails));
    window.location.reload();
  } else {
    alert("Wait a minute, who are you?");
  }
}