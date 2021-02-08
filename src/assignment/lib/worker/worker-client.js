const { loadWorkerAction } = require('./store');
const { fetchWorkerApi } = require('../api/all-service');

const loadWorkerAsync = async (dispatch, getState) => {
    const tasksAsync = await fetchWorkerApi();
    dispatch(loadWorkerAction(tasksAsync));
};

module.exports = {
    loadWorkerAsync
};