const {
  addTaskAsync,
  doneTaskAsync,
  cancelTaskAsync,
  getTasksAsync,
} = require('./task-client');
const { store$ } = require('./store');
const { fromEvent } = require('rxjs');
const { map } = require('rxjs/operators');

const taskList = document.getElementById('task-list');
const form = document.forms[0];

store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});

function render(state) {
  taskList.innerHTML = '';
  for (let i = 0; i < state.length; i++) {
    const done = (state[i].done) === true ? 'done' : 'undone';
    const cancel = (state[i].cancel) === true ? 'canceled' : 'available';
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${state[i].id}</td>
      <td>${state[i].assignee.name}</td>
      <td>${state[i].job}</td>
      <td>${done}</td>
      <td>${cancel}</td>
      <td class="action">          
      <button id="${state[i].id}" onclick="()=>store$.dispatch(cancelTaskAsync(this.id))">
        Cancel
      </button>
      <button id="${state[i].id}" class="button-done">
        Done
      </button>
      </td>
      `;
    taskList.append(row);
  }
  const cancelBtn = document.querySelectorAll('.button-cancel');
  const doneBtn = document.querySelectorAll('.button-done');
  cancelBtn$ = fromEvent(cancelBtn, 'click').pipe(
    map((event) => event.target.id)
  );
  doneBtn$ = fromEvent(doneBtn, 'click').pipe(map((event) => event.target.id));
  cancelBtn$.subscribe((val) =>
    store$.dispatch(cancelTaskAsync(val.toString()))
  );
  doneBtn$.subscribe((val) => store$.dispatch(doneTaskAsync(val.toString())));
}

const state = store$.getState();
render(state);
store$.dispatch(getTasksAsync());
