const Recipe = require('../recipe/recipe.model');

const commentsActions = {
  async addComment({ req, res }) {
    const { idUser } = req.authenticatedUser;
    const { idRecipe, comment } = req.body;

    const recipe = await Recipe.findById(idRecipe);

    if (!recipe) return res.status(404).send('Receita não encontrada');

    const object = { comment, user: idUser };

    recipe.comment.push(object);

    try {
      await recipe.save();

      return res.status(200).send('Comentário adicionado');
    } catch (error) {
      return res.status(500).send('Erro ao adicionar o comentário');
    }
  },
  async deleteComment({ req, res }) {
    const { idUser } = req.authenticatedUser;
    const { idRecipe, idComment } = req.params;

    const recipe = await Recipe.findById(idRecipe);

    if (!recipe) return res.status(404).send('Receita não encontrada');

    const index = recipe.comment
      .map(function(e) {
        return e._id;
      })
      .indexOf(idComment);

    // não funciona com 2 !==
    if (recipe.comment[index].user != idUser) {
      return res
        .status(401)
        .send('Não é possível deletar um comentário de outro usuário');
    }

    recipe.comment.splice(index, 1);
    try {
      await recipe.save();

      return res.status(200).send('Comentário deletado com sucesso');
    } catch (error) {
      return res.status(500).send('Não foi possível excluir o comentário');
    }
  },
  async editComment({ req, res }) {
    const { idUser } = req.authenticatedUser;
    const { idRecipe, idComment, comment } = req.body;

    const recipe = await Recipe.findById(idRecipe);

    if (!recipe) return res.status(404).send('Receita não encontrada');

    const index = recipe.comment
      .map(function(e) {
        return e._id;
      })
      .indexOf(idComment);

    // não funciona com 2 !==
    if (recipe.comment[index].user != idUser) {
      return res
        .status(401)
        .send('Não é possível editar um comentário de outro usuário');
    }

    recipe.comment[index].comment = comment;
    try {
      await recipe.save();

      return res.status(200).send('Comentário editado com sucesso');
    } catch (error) {
      return res.status(500).send('Não foi possível editar o comentário');
    }
  },
};

module.exports = commentsActions;
