const { client } = require('./client');

const base_url = 'http://localhost:9999/'

async function fetchTasksApi() {
  return await client.get(`${base_url}pekerjaan/list`);
}

async function addTaskApi(task) {
  return await client.post(`${base_url}pekerjaan/add`, { task });
}

async function doneTaskApi(id) {
  return await client.post(`${base_url}pekerjaan/finish`, { id });
}

async function cancelTaskApi(id){
  return await client.post(`${base_url}pekerjaan/cancel`, { id });
}
 
module.exports = {
  fetchTasksApi,
  addTaskApi,
  doneTaskApi,
  cancelTaskApi,
};
