const crypto = require('crypto');

const storage = require('../configStorage');

function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const { buffer, originalname } = file;

    const name = originalname.replace(/ /g, '_');
    const hash = crypto.randomBytes(8);

    const fileName = `${hash.toString('hex')}-${name}`;
    storage
      .bucket('iveg')
      .file(fileName)
      .createWriteStream({ resumable: false, gzip: true })
      .on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/iveg/${fileName}`;
        resolve(publicUrl);
      })
      .on('error', error => {
        // const error = 'Erro ao subir a imagem';
        reject(error);
      })
      .end(buffer);
  });
}

module.exports = uploadFile;
