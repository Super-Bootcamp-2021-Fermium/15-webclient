// setup state
const initialState = [
  {task : 0, cancelled : 0, done : 0, worker : 0}
];
function loadTasks(state, action) {
  return{
        ...state,
        task: action.payload.task
		}
  // state = action.payload;
  // return state;
}

function loadCancelled(state, action) {
  // state = action.payload;
  // return state;
  return{
        ...state,
        cancelled: action.payload.cancelled
		}
}

function loadFinished(state, action) {
  // state = action.payload;
  // return state;
  return{
        ...state,
        done: action.payload.done
		}
}

function loadWorkers(state, action) {
  // state = action.payload;
  // return state;
  return{
        ...state,
        worker: action.payload.worker
		}
}

module.exports = {
  loadCancelled,
  loadTasks,
  loadFinished,
  loadWorkers,
};
