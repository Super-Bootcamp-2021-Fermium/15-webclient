const {
    createAction,
    createReducer,
    configureStore,
  } = require('@reduxjs/toolkit');
  const { initialState, loadWorker, addWorker, removeWorker } = require('./reducer');
  const thunkMiddleware = require('redux-thunk');

  const loadWorkerAction = createAction('loadWorker');
  const addWorkerAction = createAction('addWorker');
  const removeWorkerAction = createAction('removeWorker');

  const workerReducer = createReducer(initialState, {
    [loadWorkerAction]: loadWorker,
    [addWorkerAction]: addWorker,
    [removeWorkerAction]: removeWorker,
  });

  const store$ = configureStore({
    reducer: workerReducer,
    middleware: [thunkMiddleware.default]
  });

  module.exports = {
    store$,
    loadWorkerAction,
    addWorkerAction,
    removeWorkerAction,
  };