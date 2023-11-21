const toDoDay = document.querySelector('.day');
const today = new Date();
function setDate() {
  let month = today.getMonth();
  let date = today.getDate();
  let day = today.getUTCDay();
  let todayMonth = '';
  let todayDate = date;
  let todayDay = '';
  if (month == 0) {
    todayMonth = 'Jan';
  } else if (month == 1) {
    todayMonth = 'Feb';
  } else if (month == 2) {
    todayMonth = 'Mar';
  } else if (month == 3) {
    todayMonth = 'Apr';
  } else if (month == 4) {
    todayMonth = 'May';
  } else if (month == 5) {
    todayMonth = 'Jun';
  } else if (month == 6) {
    todayMonth = 'Jul';
  } else if (month == 7) {
    todayMonth = 'Aug';
  } else if (month == 8) {
    todayMonth = 'Sep';
  } else if (month == 9) {
    todayMonth = 'Oct';
  } else if (month == 10) {
    todayMonth = 'Nov';
  } else if (month == 11) {
    todayMonth = 'Dec';
  }
  if (day == 1) {
    todayDay = 'Mon';
  } else if (day == 2) {
    todayDay = 'Tue';
  } else if (day == 3) {
    todayDay = 'Wed';
  } else if (day == 4) {
    todayDay = 'Thu';
  } else if (day == 5) {
    todayDay = 'Fri';
  } else if (day == 6) {
    todayDay = 'Sat';
  } else if (day == 7) {
    todayDay = 'Sun';
  }

  toDoDay.textContent = `${todayMonth} ${todayDay}, ${todayDate}`;
}
setDate();

const removeButton = document.querySelector('.button_day-remove');
const checkButton = document.querySelector('.button_check');
const deleteButton = document.querySelector('.button_delete');
const addButton = document.querySelector('.button_add');
const toDoInput = document.querySelector('.input');
const checkedButton = document.querySelector('.button_checked');

addButton.addEventListener('click', () => {
  addDeal();
});

const checkDeal = (evt) => {
  const task = evt.target.closest('.deal');
  const taskCheck = evt.target.closest('.button_check');
  taskCheck.style.backgroundColor = 'green';
  task.classList.add('checked');
};

const deleteDeal = (evt) => {
  const task = evt.target.closest('.deal');
  task.remove();
};

removeButton.addEventListener('click', () => {
  const tasks = document.querySelectorAll('.deal');
  tasks.forEach((item) => item.remove());
});

const editDeal = (evt) => {
  const task = evt.target.closest('.deal');
  const taskText = task.querySelector('.text');
  toDoInput.value = taskText.textContent;
  addButton.addEventListener('click', () => {
    editText(taskText);
    toDoInput.value = '';
  });
};

const editText = (task) => {
  task.textContent = toDoInput.value;
};

const toDoList = document.querySelector('.deals');
let tasks = [
  {
    checked: false,
    date: 'Tue Nov 21 2023 14:27:08',
    text: 'deal'
  },
  {
    checked: true,
    date: 'Tue Nov 21 2023 14:27:08',
    text: 'deal1'
  },
  {
    checked: true,
    date: 'Tue Nov 21 2023 14:27:08',
    text: 'deal3'
  },
  {
    checked: false,
    date: 'Tue Nov 21 2023 14:27:08',
    text: 'deal4'
  },
];

const addDeal = () => {
  const dealTemplate = document.querySelector('#template').content;
  const deal = dealTemplate.querySelector('.deal').cloneNode(true);
  const dealText = deal.querySelector('.text');
  dealText.textContent = toDoInput.value;
  deal.querySelector('.button_check').addEventListener('click', checkDeal);
  deal.querySelector('.button_delete').addEventListener('click', deleteDeal);
  deal.querySelector('.button_edit').addEventListener('click', editDeal);
  toDoInput.value = '';
  let task = new Object();
  task.text = dealText.textContent;
  task.date = today;
  task.checked = false;
  tasks.push(task);
  renderDeals(deal);
  console.log(tasks);
};

function renderDeals(deal) {
  toDoList.append(deal);
}
