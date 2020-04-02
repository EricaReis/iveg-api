const storage = require('../configStorage/');

function deleteFile(url) {
  return new Promise(async (resolve, reject) => {
    const split = url.split('iveg/');
    const filename = split[1];

    try {
      await storage
        .bucket('iveg')
        .file(filename)
        .delete();

      resolve('Imagem deletada com sucesso');
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = deleteFile;
