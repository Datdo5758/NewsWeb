"use strict";

// declare
const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");
const clickTask = document.querySelector(".close");

// class task
class taskTodo {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// check user
const currentUser = JSON.parse(getFromStorage("currentUser"));

let todoArr = [];
let todoArrUser = [];

// filter todolist from user
const filterTodo = function () {
  todoArrUser = todoArr.filter(el => el.owner == currentUser[0].userName);
};

// check exist todo and load it
if (getFromStorage("todoArr")) {
  todoArr = JSON.parse(getFromStorage("todoArr"));
  filterTodo();
}

// add todolist
btnAdd.addEventListener("click", function () {
  const todo = new taskTodo(inputTask.value, currentUser[0].userName, false);
  todoArr.push(todo);
  inputTask.value = "";
  // save todo task to localstorage
  saveAccournt("todoArr", JSON.stringify(todoArr));
  filterTodo();
  renderTodo();
});

// render todolist
const renderTodo = function () {
  let html = ``;
  todoList.innerHTML = "";

  todoArrUser.forEach(el => {
    html += `
    <li onclick="checkedTask('${el.task}')" class='${
      el.isDone == true ? "checked" : ""
    }'>${el.task}<span class="close" onclick="deleteTask('${
      el.task
    }')">×</span></li>
    `;
  });
  todoList.innerHTML = html;
};
renderTodo();

// checked the task or remove checked
const checkedTask = function (item) {
  let index = todoArr.findIndex(function (el) {
    return el.task == item;
  });
  if (index !== -1) {
    todoArr[index].isDone == false
      ? (todoArr[index].isDone = true)
      : (todoArr[index].isDone = false);

    saveAccournt("todoArr", JSON.stringify(todoArr));
    filterTodo();
    renderTodo();
  }
};

// remove the task
const deleteTask = function (item) {
  if (confirm("Are you sure?")) {
    let index = todoArr.findIndex(function (el) {
      return el.task == item;
    });
    todoArr.splice(index, 1);
    saveAccournt("todoArr", JSON.stringify(todoArr));
    filterTodo();
    renderTodo();
  } else {
    let index = todoArr.findIndex(function (el) {
      return el.task == item;
    });
    todoArr[index].isDone == false
      ? (todoArr[index].isDone = true)
      : (todoArr[index].isDone = false);

    saveAccournt("todoArr", JSON.stringify(todoArr));
    filterTodo();
    renderTodo();
  }
};
