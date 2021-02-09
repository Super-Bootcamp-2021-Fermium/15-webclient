const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');

const {initialState, loadCancelled, loadFinished, loadTasks, loadWorkers } = require('./reducer');
//const { loggingMiddleware, delayActionMiddleware, asyncMiddleware } = require('./middleware');
const thunkMiddleware = require('redux-thunk');

const loadTasksAction = createAction('loadTasks');
const loadCancelledAction = createAction('loadCancelled');
const loadFinishedAction = createAction('loadFinished');
const loadWorkersAction = createAction('loadWorkers');

const performanceReducer = createReducer(initialState, {
  [loadTasksAction]: loadTasks,
  [loadCancelledAction]: loadCancelled,
  [loadFinishedAction]: loadFinished,
  [loadWorkersAction]: loadWorkers
});

const store$ = configureStore({
  reducer: performanceReducer,
  middleware: [thunkMiddleware.default]
});

module.exports = {
  store$,
  loadCancelledAction,
  loadFinishedAction,
  loadWorkersAction,
  loadTasksAction,
};
