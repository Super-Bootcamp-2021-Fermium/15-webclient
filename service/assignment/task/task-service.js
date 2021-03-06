const Busboy = require('busboy');
const { Writable } = require('stream');
const { saveFile } = require('../lib/minio');
const {
  writeTask,
  updateTask,
  readTask,
  readTaskDone,
  readTaskCancelled,
} = require('./task');
const { streamer } = require('../lib/nats');
const {
  saveTaskAdded,
  saveTaskDone,
  saveTaskCancelled,
} = require('../performance/performance');
const url = require('url');

async function addTaskService(req, res) {
  const busboy = new Busboy({ headers: req.headers });
  let obj = {};
  let finished = false;

  function abort() {
    req.unpipe(busboy);
    if (!req.aborted) {
      res.statusCode = 413;
      res.end();
    }
  }

  busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    switch (fieldname) {
      case 'attachment':
        {
          try {
            const attachment = await saveFile(file, mimetype, fieldname);
            obj[`${fieldname}`] = attachment;
          } catch (err) {
            abort();
          }

          if (finished) {
            const add = await writeTask(obj);
            const total = JSON.parse(await readTask());
            saveTaskAdded();
            streamer('task.added', total.length.toString());
            res.write(add);
            res.end();
          }
        }
        break;
      default: {
        const noop = new Writable({
          write(chunk, encding, callback) {
            setImmediate(callback);
          },
        });
        file.pipe(noop);
      }
    }
  });

  busboy.on('field', async (fieldname, val) => {
    obj[`${fieldname}`] = val;
  });

  busboy.on('finish', async () => {
    finished = true;
  });

  req.on('aborted', abort);
  busboy.on('error', abort);

  req.pipe(busboy);
}

async function finishTaskService(req, res) {
  const uri = url.parse(req.url, true);
  const id = uri.pathname.replace('/pekerjaan/finish/', '');
  if (!id) {
    res.statusCode = 400;
    res.write('request tidak sesuai');
    res.end();
  }

  const stat = await updateTask({ done: true }, id);
  const done = JSON.parse(await readTaskDone());
  saveTaskDone();
  streamer('task.done', done.length.toString());
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(stat, null, 4));
  res.end();
}

async function cancelTaskService(req, res) {
  const uri = url.parse(req.url, true);
  const id = uri.pathname.replace('/pekerjaan/cancel/', '');
  if (!id) {
    res.statusCode = 400;
    res.write('request tidak sesuai');
    res.end();
  }
  const stat = await updateTask({ cancel: true }, id);
  const cancel = JSON.parse(await readTaskCancelled());
  saveTaskCancelled();
  streamer('task.cancelled', cancel.length.toString());

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(stat, null, 4));
  res.end();
}

async function readTaskService(req, res) {
  const data = await readTask();
  res.setHeader('Content-Type', 'application/json');
  res.write(data);
  res.statusCode = 200;
  res.end();
}

module.exports = {
  addTaskService,
  readTaskService,
  finishTaskService,
  cancelTaskService,
};
