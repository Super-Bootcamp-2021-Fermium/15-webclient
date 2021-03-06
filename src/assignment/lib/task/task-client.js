const { dispatch } = require('rxjs/internal/observable/pairs');
const {    
    addAction,
    doneAction,
    cancelAction,
    loadTasksAction,
  } = require('./store')
const {
    fetchTasksApi,
    addTaskApi,
    doneTaskApi,
    undoneTaskApi,
} = require('../api/all-service')

const addTaskAsync = (task) => async(dispatch, getState) => {
    const taskData = await addTaskApi(task)
    dispatch(addAction(taskData))
}

const getTasksAsync = () => async(dispatch, getState) => {
    const taskData = await fetchTasksApi()
    dispatch(loadTasksAction(taskData))
}  
 
const cancelTaskAsync = (id) => async (dispatch, getState) => {
    console.log(id)
    const taskId = await undoneTaskApi(id)    
    await dispatch(cancelAction(taskId))
}

const doneTaskAsync = (id) => async(dispatch, getState) => {
    const taskId = await doneTaskApi(id)
    dispatch(doneAction(taskId))
}  


module.exports = {
    addTaskAsync,
    doneTaskAsync,
    cancelTaskAsync,
    getTasksAsync
}