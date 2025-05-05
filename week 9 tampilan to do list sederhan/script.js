// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const clearAllButton = document.getElementById('clear-all');

// Load tasks from Local Storage and render them
document.addEventListener('DOMContentLoaded', loadTodos);

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach((todo) => addTodoToDOM(todo));
}

//  new task
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const todoText = todoInput.value.trim();

  if (todoText) {
    addTodoToDOM(todoText);
    saveTodoToLocalStorage(todoText);
    todoInput.value = '';
  }
});

// Add task to the DOM
function addTodoToDOM(todoText) {
  const li = document.createElement('li');
  li.textContent = todoText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Hapus';
  deleteButton.addEventListener('click', () => deleteTodoFromDOM(li, todoText));

  li.appendChild(deleteButton);
  todoList.appendChild(li);
}

// Save task to Local Storage
function saveTodoToLocalStorage(todoText) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(todoText);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Delete task from the DOM and Local Storage
function deleteTodoFromDOM(li, todoText) {
  li.remove();
  deleteTodoFromLocalStorage(todoText);
}

function deleteTodoFromLocalStorage(todoText) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const updatedTodos = todos.filter((todo) => todo !== todoText);
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
}

// Clear all 
clearAllButton.addEventListener('click', () => {
  localStorage.clear();
  todoList.innerHTML = '';
});
