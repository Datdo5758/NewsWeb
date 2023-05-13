"use strict";

// declare variable
const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputCFpassword = document.getElementById("input-password-confirm");
const btnRegister = document.getElementById("btn-submit");

// validate for input form
const validate = function (arr) {
  if (arr.firstName == "") {
    alert("Please enter your Firstname");
    return false;
  }
  if (arr.lastName == "") {
    alert("Please enter your Lastname");
    return false;
  }
  if (arr.userName == "") {
    alert("Please enter your Username");
    return false;
  }
  if (userNameArr.indexOf(arr.userName) !== -1) {
    alert("Your username already exists");
    return false;
  }
  if (arr.passWord == "") {
    alert("Please enter your Password");
    return false;
  } else if (arr.passWord.length <= 8) {
    alert("Password must be more than 8 characters");
    return false;
  }
  if (inputCFpassword.value !== arr.passWord) {
    alert("Your confirm password is wrong");
    return false;
  }
  return true;
};

// clear input form after submit
const clearInput = function () {
  inputFirstname.value = "";
  inputLastname.value = "";
  inputUsername.value = "";
  inputPassword.value = "";
  inputCFpassword.value = "";
};

// Define the User class
class User {
  constructor(firstName, lastName, userName, passWord) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.passWord = passWord;
  }
}

// Initialize the userArr array
let userArr = [];

// check exist user and load it
if (getFromStorage("userArr")) {
  userArr = JSON.parse(getFromStorage("userArr"));
}
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.passWord
  );

  return user;
}

const userNameArr = userArr.map(item => item.userName);

// click btn and save accournt to localstorage
btnRegister.addEventListener("click", function () {
  // Create a new user object
  const newUser = new User(
    inputFirstname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value
  );
  console.log(newUser);
  if (validate(newUser)) {
    userArr.push(newUser);
    userNameArr.push(newUser.userName);
    saveAccournt("userArr", JSON.stringify(userArr));
    clearInput();
    window.location.href = "../pages/login.html";
  }
});
