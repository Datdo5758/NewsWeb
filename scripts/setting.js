"use strict";
// declare
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");

// validate
const validate = function () {
  if (Number(inputPageSize.value) < 0 || inputPageSize.value == "") {
    alert("Please enter the number news per page");
    return false;
  }
  console.log(inputPageSize.value);
  if (inputCategory.value == "General") {
    alert("Please enter the category");
    return false;
  }

  return true;
};

// press save setting buttonx
btnSubmit.addEventListener("click", function () {
  if (validate()) {
    pageSize = inputPageSize.value;
    sources = `category=${inputCategory.value}`;
    settingNews = JSON.parse(getFromStorage("settingNews"));
    settingNews = [pageSize, sources];
    saveAccournt("settingNews", JSON.stringify(settingNews));
    inputCategory.value = "General";
    inputPageSize.value = "";
    window.location.href = "../pages/news.html";
  }
});
