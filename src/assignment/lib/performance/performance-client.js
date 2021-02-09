const { dispatch } = require('rxjs/internal/observable/pairs');
const {
    fetchAllTaskApi,
    fetchAllWorkerApi,
    fetchDoneTaskApi,
    fetchCancelledTaskApi
} = require('../api/all-service');

const {
    loadTasksAction,
    loadWorkersAction,
    loadFinishedAction,
    loadCancelledAction,
} = require('./store');

const getAllTasksAsync = async(dispatch, getState) => {
    const allTasksAsync = await fetchAllTaskApi();
    dispatch(loadTasksAction(allTasksAsync));
};

const getAllWorkerAsync = async(dispatch, getState) => {
    const allWorkerAsync = await fetchAllWorkerApi();
    dispatch(loadWorkersAction(allWorkerAsync));
};

const getDoneTaskAsync = async(dispatch, getState) => {
    const doneTaskAsync = await fetchDoneTaskApi();
    dispatch(loadFinishedAction(doneTaskAsync));
};

const getCancelledTaskAsync = async(dispatch, getState) => {
    const allCancelledTaskAsync = await fetchCancelledTaskApi();
    dispatch(loadCancelledAction(allCancelledTaskAsync));
};

module.exports = {
    getAllTasksAsync,
    getAllWorkerAsync,
    getDoneTaskAsync,
    getCancelledTaskAsync,
};
