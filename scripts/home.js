"use strict";

// declare
const content = document.getElementById("content");
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

// check currentUser

let currentUser = JSON.parse(getFromStorage("currentUser", null) ?? "[]");
if (currentUser.length) {
  loginModal.style.display = "none";
  welcomeMessage.textContent = `Welcome ${currentUser[0].userName}`;
} else {
  mainContent.style.display = "none";
}

// press logout button
btnLogout.addEventListener("click", function () {
  currentUser = [];
  saveAccournt("currentUser", JSON.stringify(currentUser));
  window.location.href = "../pages/login.html";
});
