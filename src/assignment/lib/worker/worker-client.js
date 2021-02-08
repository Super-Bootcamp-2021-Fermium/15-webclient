const { loadWorkerAction, addWorkerAction } = require('./store');
const { fetchWorkerApi, addWorkerApi } = require('../api/all-service');

const loadWorkerAsync = async (dispatch, getState) => {
    const workerAsync = await fetchWorkerApi();
    dispatch(loadWorkerAction(workerAsync));
};

const addWorkerAsync = (worker) => async (dispatch, getState) => {
    const workerData = await addWorkerApi(worker);
    dispatch(addWorkerAction(workerData));
};

module.exports = {
    loadWorkerAsync,
    addWorkerAsync
};