"use strict";

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const dateOfBirthInput = document.getElementById("date-of-birth");
const citySelect = document.getElementById("city-select");
const descriptionTextArea = document.getElementById("description");
const passwordLength = document.getElementById("password-length");
const genderInput = document.getElementsByName("gender");

// Extract the data from the local Storage:
const extractAuthData = localStorage.getItem("authentication");
const authDatas = JSON.parse(extractAuthData);

// Event listener for signup form submission
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    signup();
  });
}

// Event listener for login form submission
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
  });
}

// Function to handle signup
function signup() {
  let isEmailExisting = emailValidate();

  if (isEmailExisting) {
    alert("Email Already Existing");
  } else if (passwordInput.value.length < 8) {
    passwordLength.style.color = "red";
    passwordLength.innerHTML = "Must be at least 8 characters";
  } else if (passwordInput.value !== confirmPasswordInput.value) {
    passwordLength.style.color = "red";
    passwordLength.innerHTML = "password and confirm did not match";
  } else if (!/([a-z])/.test(passwordInput.value)) {
    passwordLength.style.color = "red";
    passwordLength.innerHTML = "Password must contain lowercase";
  } else if (!/([A-Z])/.test(passwordInput.value)) {
    passwordLength.style.color = "red";
    passwordLength.innerHTML = "Password must contain uppercase";
  } else if (!/([0-9])/.test(passwordInput.value)) {
    passwordLength.style.color = "red";
    passwordLength.innerHTML = "Password must contain number";
  } else if (!/([!@#$%^&*(),.?":{}|<>])/.test(passwordInput.value)) {
    passwordLength.style.color = "red";
    passwordLength.innerHTML = "Password must contain special character";
  } else {
    const authenticationData = {
      fullName: fullNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      confirmPassword: confirmPasswordInput.value,
      dateOfBirth: dateOfBirthInput.value,
      gender: genderData(),
      city: citySelect.value,
      description: descriptionTextArea.value,
    };

    let authenticateArray;

    if (extractAuthData) {
      authenticateArray = authDatas;
    } else {
      authenticateArray = [];
    }

    authenticateArray.push(authenticationData);
    localStorage.setItem("authentication", JSON.stringify(authenticateArray));
    signupForm.reset();
    window.location.href = "index.html";
  }
}

// Function to get the value of the selected gender:
function genderData() {
  let genderValue;

  for (const radio of genderInput) {
    if (radio.checked) {
      genderValue = radio.value;
    }
  }

  return genderValue;
}

// Function to validate the email
let emailValidate = () => {
  if (authDatas) {
    let existingEmail;

    authDatas.forEach((authData, i) => {
      existingEmail = authData.email.includes(emailInput.value);
    });

    return existingEmail;
  }
};

// Function for login
function login() {
  let loginSuccess = false;

  if (authDatas) {
    authDatas.forEach((authData, i) => {
      const isEmailMatch = authData.email;
      const isPasswordMatch = authData.password;

      if (
        isEmailMatch === emailInput.value &&
        isPasswordMatch === passwordInput.value
      ) {
        loginSuccess = true;
        alert("login success");
        window.location.href = `dashboard.html?name=${encodeURIComponent(
          authData.fullName
        )}&email=${encodeURIComponent(authData.email)}`;
      }
    });
  }

  if (!loginSuccess) {
    alert("Email and Password did not match");
  }
}
