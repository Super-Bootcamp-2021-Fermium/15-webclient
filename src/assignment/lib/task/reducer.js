// setup state
const initialState = [];
  
  // reduce function
  function addTask(state, action) {
    state.push(action.payload);
    return state;
  }
  
  function taskDone(state, action) {
    const task = state.find((t) => t.id === action.payload);
    console.log(task)
    task.done = true;
    return state;
  }
  
  function taksCanceled(state, action) {
    const task = state.find((t) => t.id === action.payload);
    task.done = false;
    return state;
  }
  
  function loadTasks(state, action) {    
    state = action.payload
    return state;
  }
  
  module.exports = {
    initialState,
    addTask,
    taskDone,
    taksCanceled,
    loadTasks,
  };
  