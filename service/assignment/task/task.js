const { getConnection } = require('typeorm');

async function writeTask(data) {
  if (!data.job || !data.assignee) {
    const r = {
      status: 'failed',
      message: 'data pekerjaan tidak lengkap',
    };
    return JSON.stringify(r, null, 4);
  }

  const task = getConnection().getRepository('Task');
  const create = task.create(data);
  await task.save(create);
  return JSON.stringify(create, null, 4);
}

async function readTask() {
  const task = getConnection().getRepository('Task');
  let jobs = await task.find({ relations: ['assignee'] });
  return JSON.stringify(jobs);
}

async function readTaskDone() {
  const task = getConnection().getRepository('Task');
  let jobs = await task.find({
    where: { done: true },
    relations: ['assignee'],
  });
  return JSON.stringify(jobs);
}

async function readTaskCancelled() {
  const task = getConnection().getRepository('Task');
  let jobs = await task.find({
    where: { cancel: true },
    relations: ['assignee'],
  });
  return JSON.stringify(jobs);
}

async function updateTask(data, id) {
  return await getConnection()
    .createQueryBuilder()
    .update('Task')
    .set(data)
    .where(' id = :id', { id })
    .execute();
}

module.exports = {
  writeTask,
  readTask,
  updateTask,
  readTaskDone,
  readTaskCancelled,
};
