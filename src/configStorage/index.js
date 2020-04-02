const { Storage } = require('@google-cloud/storage');
const path = require('path');

const serviceKey = path.join(
  __dirname,
  './prefab-poetry-272614-42551753b2ba.json'
);

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'prefab-poetry-272614',
});

module.exports = storage;
