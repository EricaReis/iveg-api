const uploadImage = require('../common/uploadFile');
const deleteImage = require('../common/deleteFile');
const Recipe = require('../recipe/recipe.model');

const pictureActions = {
  uploadFile(req) {
    return new Promise((resolve, reject) => {
      uploadImage(req.file)
        .then(async response => {
          const { id } = req.headers;
          try {
            await Recipe.findByIdAndUpdate(id, { url_img: response });
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
      const { url_img } = await Recipe.findById(id, { url_img: 'url_img' });
      deleteImage(url_img)
        .then(async () => {
          try {
            await Recipe.findByIdAndUpdate(id, { url_img: '' });
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
