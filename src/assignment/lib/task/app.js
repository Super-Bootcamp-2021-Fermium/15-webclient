


function render(state) {
    list.innerHTML = '';
    for (let i = 0; i < state.length; i++) {
      const todo = state[i];
      const li = document.createElement('li');
      li.textContent = todo.task;
      if (todo.done) {
        li.className = 'todo-done';
        li.onclick = function () {
          // dispatch action done
          store$.dispatch(undoneTaskAsync(todo.id));
        };
      } else {
        li.className = '';
        li.onclick = function () {
          // dispatch action done
          store$.dispatch(doneTaskAsync(todo.id));
        };
      }
      list.append(li);
    }
  }
  