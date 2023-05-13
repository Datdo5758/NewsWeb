"use strict";

// declare
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

// validate
const validate = () => {
  if (inputUsername.value == "") {
    alert("Please enter your Username");
    return false;
  }
  if (inputPassword.value == "") {
    alert("Please enter your Password");
    return false;
  }
  return true;
};

// get array user form localstorage
const userArr = JSON.parse(getFromStorage("userArr") ?? "[]");
console.log(userArr);
// press login
btnLogin.addEventListener("click", function () {
  if (validate()) {
    const currentUser = userArr.filter(
      el => el.userName == inputUsername.value
    );
    if (currentUser.length) {
      if (currentUser[0].passWord == inputPassword.value) {
        saveAccournt("currentUser", JSON.stringify(currentUser));
        window.location.href = "../index.html";
      } else {
        alert("Username or Password is invalid");
      }
    } else {
      alert("Username or Password is invalid");
    }
  }
});
