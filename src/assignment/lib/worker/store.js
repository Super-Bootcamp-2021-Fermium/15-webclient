const {
    createAction,
    createReducer,
    configureStore,
  } = require('@reduxjs/toolkit');
  const { initialState, loadWorker } = require('./reducer');
  const thunkMiddleware = require('redux-thunk');

  const loadWorkerAction = createAction('loadWorker');

  const workerReducer = createReducer(initialState, {
    [loadWorkerAction]: loadWorker,
  });

  const store$ = configureStore({
    reducer: workerReducer,
    middleware: [thunkMiddleware.default]
  });

  module.exports = {
    store$,
    loadWorkerAction
  };