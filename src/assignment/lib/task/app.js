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
const formElems = document.forms[0].elements;
const form = document.querySelector('#task-form')
const formData = new FormData()

function formHandle(){
  const form = document.querySelector('#task-form')
  const attachment = document.getElementsByName("attachment")[0]
  attachment.onchange = chooseFile
  form.onsubmit = formSubmit
}

function chooseFile(event) {
  let file = event.target.files[0]
  formData.append('attachment', file)
}

function formSubmit(event){
event.preventDefault()
formData.append('assignee', formElems.assignee.value)
formData.append('job', formElems.job.value)
formData.append('done', false)
formData.append('cancel', false)
store$.dispatch(addTaskAsync(formData))
form.reset()
}


function render(state) {
  taskList.innerHTML = '';
  for (let i = 0; i < state.length; i++) {
    const done = (state[i].done) === true ? 'done' : 'undone';
    const cancel = (state[i].cancel) === true ? 'canceled' : 'available';
    const row = document.createElement('tr');
    const doneBtn = document.createElement('button')
    doneBtn.innerText = 'done'
    doneBtn.onclick = () => store$.dispatch(doneTaskAsync(state[i].id))
    const cancelBtn = document.createElement('button')
    cancelBtn.innerText = 'cancel'
    cancelBtn.onclick = () => store$.dispatch(cancelTaskAsync(state[i].id))
    row.innerHTML = `
      <td>${state[i].id}</td>
      <td>${state[i].assignee.name}</td>
      <td>${state[i].job}</td>
      <td>${done}</td>
      <td>${cancel}</td>
      <td class="action">          
      </td>
      `;
    row.lastElementChild.append(cancelBtn)
    row.lastElementChild.append(doneBtn)
    taskList.append(row);
  }
}

function main() {
  formHandle()
  store$.subscribe(() => {
      const state = store$.getState();
      render(state);
  });
  store$.dispatch(getTasksAsync());
  const state = store$.getState();
  render(state);
}
main()