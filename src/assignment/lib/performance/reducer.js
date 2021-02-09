// setup state
const initialState = {task : 0, cancelled : 0, done : 0, worker : 0};
function loadTasks(state, action) {
  state.task = action.payload.task
  return state;
}

function loadCancelled(state, action) {
  state.cancelled = action.payload.cancelled
  return state;
}

function loadFinished(state, action) {
  state.done = action.payload.done
  return state;
}

function loadWorkers(state, action) {
  state.worker = action.payload.worker
  return state;
}

module.exports = {
  loadCancelled,
  loadTasks,
  loadFinished,
  loadWorkers,
  initialState,
};
