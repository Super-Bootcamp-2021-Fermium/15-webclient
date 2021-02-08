const {
    createAction,
    createReducer,
    configureStore,
  } = require('@reduxjs/toolkit');
  const { initialState, loadWorker, addWorker } = require('./reducer');
  const thunkMiddleware = require('redux-thunk');

  const loadWorkerAction = createAction('loadWorker');
  const addWorkerAction = createAction('addWorker');

  const workerReducer = createReducer(initialState, {
    [loadWorkerAction]: loadWorker,
    [addWorkerAction]: addWorker,
  });

  const store$ = configureStore({
    reducer: workerReducer,
    middleware: [thunkMiddleware.default]
  });

  module.exports = {
    store$,
    loadWorkerAction,
    addWorkerAction
  };