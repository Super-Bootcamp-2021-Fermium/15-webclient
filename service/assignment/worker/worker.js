const { getConnection } = require('typeorm');

async function writeWorker(data) {
  if (
    !data.name ||
    !data.alamat ||
    !data.biografi ||
    !data.email ||
    !data.photo ||
    !data.telepon
  ) {
    const r = {
      status: 'failed',
      message: 'data pekerja tidak lengkap',
    };
    return JSON.stringify(r, null, 4);
  }

  const worker = getConnection().getRepository('Worker');
  const create = worker.create(data);
  await worker.save(create);
  return JSON.stringify(create, null, 4);
}

async function readWorker() {
  const worker = getConnection().getRepository('Worker');
  let workers = await worker.find();
  return JSON.stringify(workers);
}

async function deleteWorker(id) {
  return await getConnection()
    .createQueryBuilder()
    .delete()
    .from('Worker')
    .where(' id = :id', { id })
    .execute();
}

module.exports = {
  writeWorker,
  readWorker,
  deleteWorker,
};
