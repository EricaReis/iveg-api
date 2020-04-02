const uploadImage = require('../common/uploadFile');
const deleteImage = require('../common/deleteFile');
const User = require('../user/user.model');

const pictureActions = {
  uploadFile(req) {
    return new Promise((resolve, reject) => {
      uploadImage(req.file)
        .then(async response => {
          const { id } = req.headers;
          try {
            await User.findByIdAndUpdate(id, { url_img: response });
            resolve('Imagem adicionada com sucesso');
          } catch (error) {
            reject(error);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  deleteFile(id) {
    return new Promise(async (resolve, reject) => {
      const { url_img } = await User.findById(id, { url_img: 'url_img' });
      deleteImage(url_img)
        .then(async () => {
          try {
            await User.findByIdAndUpdate(id, { url_img: '' });
            resolve('Imagem apagada com sucesso');
          } catch (error) {
            reject(error);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

module.exports = pictureActions;
