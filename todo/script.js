var xhr = new XMLHttpRequest();
var addButton = document.querySelector('button');
var app = document.querySelector('.app');
var responseObject;

function addOptionsToTask(task){
  let options = createOptions(task);
  task.appendChild(options);
}

function createOptions(task) {
  let menu = createNodeWithClass('div','options')
  let del = createNodeWithClass('div','option-delete')
  let check = createNodeWithClass('input','option-check')
  check.type = 'checkbox';
  check.checked = task.completed;
  addEventTo(del, deleteTodo);
  addEventTo(check, completeTodo);
  menu.appendChild(del);
  menu.appendChild(check);
  return menu;
}

function addEventTo(element, func) {
  element.addEventListener('click', func);
}

function createNodeWithClass(elementType, className) {
  let element = document.createElement(elementType);
  element.className = className;
  return element;
}

function refreshList() {
  let todoList = document.querySelector('ul');
  app.removeChild(todoList);
  todoList = document.createElement('ul');
  app.appendChild(todoList);
}

function appendToDo(object, parent) {
  if (object.text.length < 1) { return ;}
  todoElement = document.createElement('li');
  todoElement.innerHTML = '<span>' + object.text + '</span>';
  todoElement.className = object.id;
  todoElement.completed = object.completed;
  parent.appendChild(todoElement);
  addOptionsToTask(todoElement);
}

function printTodos() {
  let todoList = document.querySelector('ul');
  todoList.className = 'todo-list';
  for (var i = 0; i < responseObject.length; i++) {
    appendToDo(responseObject[i], todoList);
  }
  app.appendChild(todoList);
}

function getContent() {
  xhr.open('GET', 'https://mysterious-dusk-8248.herokuapp.com/todos', true);
  xhr.responseType = 'json';
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || 201 || 202 || 304 )
        { responseObject = xhr.response;
          refreshList();
          printTodos();
        }
       else {
        console.log('Error: ' + xhr.status);
      }
    }
  };
  xhr.send(null);
}

function postContent(data) {
  xhr.open('POST', 'https://mysterious-dusk-8248.herokuapp.com/todos', true);
  xhr.setRequestHeader("content-type",'application/json',
                      "Accept","text/html; charset=utf-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || 201 || 202 || 304 )
        { getContent();}
       else {
        console.log('Error: ' + xhr.status);
      }
    }
  };
  xhr.send(data);

}

function deleteContent(id) {
  xhr.open('DELETE', 'https://mysterious-dusk-8248.herokuapp.com/todos/' + id, true);
  xhr.setRequestHeader("Accept",'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || 201 || 202 || 304 )
        { getContent();}
       else {
        console.log('Error: ' + xhr.status);
      }
    }
  };
  xhr.send(null);
}

function completeTask(object, id) {
  xhr.open('PUT', 'https://mysterious-dusk-8248.herokuapp.com/todos/' + id, true);
  xhr.setRequestHeader("content-type",'application/json');
  xhr.send(JSON.stringify(object));
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || 201 || 202 || 304 )
        { getContent();}
       else {
        console.log('Error: ' + xhr.status);
      }
    }
  };
}

function deleteTodo(event) {
  event.preventDefault();
  let target = event.currentTarget;
  let id = target.parentNode.parentNode.className;
  deleteContent(id);
}

function completeTodo(event) {
  event.preventDefault();
  let taskToComplete = {};
  let targetTask = event.currentTarget.parentNode.parentNode;
  taskToComplete.id = targetTask.className;
  taskToComplete.text = targetTask.textContent;
  taskToComplete.completed = event.currentTarget.checked;
  completeTask(taskToComplete, taskToComplete.id);
}

function addTodo(event) {
  event.preventDefault();
  let form = document.querySelector('form');
  let taskToAdd = document.querySelector('input').value;
  if (taskToAdd.length < 1) { return; }
  form.reset();
  let task = {};
  task.text = taskToAdd;
  postContent(JSON.stringify(task));

}

getContent();

addButton.addEventListener('click', addTodo);

setTimeout(function(){
   getContent();
}, 10000);
