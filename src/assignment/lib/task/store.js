const {
    createAction,
    createReducer,
    configureStore,
  } = require('@reduxjs/toolkit');
  const { initialState, addTask,taskDone, taksCanceled, loadTasks } = require('./reducer');
  const thunkMiddleware = require('redux-thunk');
  
  const addAction = createAction('addTask');
  const doneAction = createAction('taskDone');
  const cancelAction = createAction('taskCanceled');
  const loadTasksAction = createAction('loadTasks');
  
  const taskReducer = createReducer(initialState, {
    [addAction]: addTask,
    [doneAction]: taskDone,
    [cancelAction]: taksCanceled,
    [loadTasksAction]: loadTasks
  });
  
  const store$ = configureStore({
    reducer: taskReducer,
    middleware: [thunkMiddleware.default]
  });
  
  module.exports = {
    store$,
    addAction,
    doneAction,
    cancelAction,
    loadTasksAction,
  };
  