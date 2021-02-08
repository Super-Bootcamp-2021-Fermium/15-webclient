const { loadWorkerAction, addWorkerAction, removeWorkerAction } = require('./store');
const { fetchWorkerApi, addWorkerApi, deleteWorkerApi } = require('../api/all-service');

const loadWorkerAsync = async (dispatch, getState) => {
    const workerAsync = await fetchWorkerApi();
    dispatch(loadWorkerAction(workerAsync));
};

const addWorkerAsync = (worker) => async (dispatch, getState) => {
    const workerData = await addWorkerApi(worker);
    dispatch(addWorkerAction(workerData));
};

const deleteWorkerAsync = (id) => async (dispatch, getState) => {
    await deleteWorkerApi(id);
    dispatch(removeWorkerAction(id));
};

module.exports = {
    loadWorkerAsync,
    addWorkerAsync,
    deleteWorkerAsync
};