const { client } = require('./client');

const base_url = 'http://localhost:9999/'

async function fetchTasksApi() {
  return await client.get(`${base_url}pekerjaan/list`);
}

async function addTaskApi(task) {
  return await client.post(`${base_url}pekerjaan/add`, { task });
}

async function doneTaskApi(id) {
  return await client.post(`${base_url}pekerjaan/finish/${id}` );
}

async function undoneTaskApi(id){
  return await client.put(`${base_url}pekerjaan/cancel/${id}`);
}

async function fetchWorkerApi() {
  return await client.get(`${base_url}pekerja/list`);
}

async function addWorkerApi(worker) {
  const headers = { 'Content-Type': 'multipart/form-data' }
  return await client.post(`${base_url}pekerja/add`, worker, { headers });
}

async function deleteWorkerApi(id) {
  return await client.delete(`${base_url}pekerja/delete/${id}`);
}

async function fetchAllWorkerApi() {
  return await client.get(`${base_url}jumlah/pekerja`);
}

async function fetchAllTaskApi() {
  return await client.get(`${base_url}jumlah/pekerjaan`);
}

async function fetchDoneTaskApi() {
  return await client.get(`${base_url}jumlah/done`);
}

async function fetchCancelledTaskApi() {
  return await client.get(`${base_url}jumlah/cancel`);
}
 
module.exports = {
  fetchTasksApi,
  addTaskApi,
  doneTaskApi,
  undoneTaskApi,
  fetchWorkerApi,
  addWorkerApi,
  deleteWorkerApi,
  fetchAllTaskApi,
  fetchAllWorkerApi,
  fetchDoneTaskApi,
  fetchCancelledTaskApi
};
