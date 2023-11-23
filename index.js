const input = document.querySelector('.input');
const submitButton = document.querySelector('.button_submit');
const taskList = document.querySelector('.tasks');
const form = document.querySelector('.form');
const deleteAllButton = document.querySelector('.button_delete-all');
const showCheckedButton = document.querySelector('.button_show-checked');
const calendar = document.querySelector('.calendar');
const allTasks = document.querySelectorAll('.task');

const today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
let day = today.getDay();

let tasks = [];
localStorage.setItem('task', JSON.stringify(tasks));
let taskToEdit = null;

const BUTTON_SAVE_TITLE = 'Save task';
const BUTTON_ADD_TITLE = 'Add task';

const editTask = (evt) => {
  const item = evt.target.closest('.task');
  item.classList.add('task_edit');
  const itemText = item.querySelector('.text');
  submitButton.textContent = BUTTON_SAVE_TITLE;
  input.value = itemText.textContent;
  taskToEdit = itemText.textContent;
};

const checkTask = (evt) => {
  const task = evt.target.closest('.task');
  const taskButton = evt.target.closest('.button_check');
  taskButton.classList.toggle('checked');
  tasks.forEach((item) => {
    if (item.id == task.id && item.check == false) {
      item.check = true;
      localStorage.setItem('task', JSON.stringify(tasks));
    } else if (item.id == task.id && item.check == true) {
      item.check = false;
      localStorage.setItem('task', JSON.stringify(tasks));
    }
  });
};

const deleteTask = (evt) => {
  const task = evt.target.closest('.task');
  task.remove();
  for (let i = 0; i < tasks.length; i++) {
    if (task.id == tasks[i].id) {
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem('task', JSON.stringify(tasks));
};

function addTask(item) {
  const template = document.querySelector('#template').content;
  const task = template.querySelector('.task').cloneNode(true);
  const taskText = task.querySelector('.text');
  const taskEdit = task.querySelector('.button_edit');
  const taskCheck = task.querySelector('.button_check');
  const taskDelete = task.querySelector('.button_delete');
  taskEdit.addEventListener('click', editTask);
  taskCheck.addEventListener('click', checkTask);
  taskDelete.addEventListener('click', deleteTask);
  taskText.textContent = item.name;
  task.id = item.id;
  if (item.check == true) {
    taskCheck.classList.add('checked');
  }
  input.value = '';
  renderTask(task);
}

function addTaskToArr() {
  let newTask = new Object();
  newTask.name = input.value;
  newTask.check = false;
  newTask.date = calendar.value;
  newTask.id = Math.floor(Math.random() * 10000000);
  tasks.push(newTask);
  addTask(newTask);
  localStorage.setItem('task', JSON.stringify(tasks));
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (input.value.trim() == '') {
    return null;
  } else if (taskToEdit) {
    enableEditMode();
  } else {

    addTaskToArr();
  }
});

function renderTask(item) {
  taskList.prepend(item);
}

const enableEditMode = () => {
  const task = document.querySelector('.task_edit');
  const taskText = task.querySelector('.text');
  taskText.textContent = input.value;
  tasks.forEach((item) => {
    if (item.id == task.id) {
      item.name = taskText.textContent;
    }
  });
  task.classList.remove('task_edit');
  taskToEdit = null;
  disableEditMode();
  localStorage.setItem('task', JSON.stringify(tasks));
};

const disableEditMode = () => {
  submitButton.textContent = BUTTON_ADD_TITLE;
  input.value = '';
};

deleteAllButton.addEventListener('click', () => {
  const allTasks = document.querySelectorAll('.task');
  allTasks.forEach((item) => {
    for (let i = 0; i < tasks.length; i++) {
      if (item.id == tasks[i].id) {
        item.remove();
        tasks.splice(i, 1);
      }
    }
  });

  localStorage.setItem('task', JSON.stringify(tasks));
});

function renderByDay() {
  tasks = JSON.parse(localStorage.getItem('task'));
  tasks.forEach((item) => {
    if (item.date == calendar.value) {
      addTask(item);
    }
  });
}
calendar.value = `${year}-${month}-${date}`;
calendar.placeholder = calendar.value;
renderByDay();

calendar.addEventListener('change', () => {
  calendar.placeholder = calendar.value;
  reRenderTasks();
  renderByDay();
});

showCheckedButton.addEventListener('click', () => {
  if (showCheckedButton.classList.contains('checked')) {
    reRenderTasks();
    renderByDay();
    showCheckedButton.classList.remove('checked');
    showCheckedButton.textContent = 'Show Checked';
  } else {
    reRenderTasks();
    renderByCheck();
    showCheckedButton.classList.add('checked');
    showCheckedButton.textContent = 'Hide Checked';
  }
});

function renderByCheck() {
  tasks.forEach((item) => {
    if (item.date == calendar.value && item.check == true) {
      addTask(item);
    }
  });
}

function reRenderTasks() {
  document.querySelectorAll('.task').forEach((item) => {
    item.remove();
  });
}
