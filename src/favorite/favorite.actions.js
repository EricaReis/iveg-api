const Recipe = require('../recipe/recipe.model');

const favoriteActions = {
  async addToFavorite({ req, res }) {
    const { idUser } = req.authenticatedUser;
    const { idRecipe } = req.body;

    const recipe = await Recipe.findById(idRecipe);

    if (!recipe) return res.status(404).send('Receita não encontrada');

    if (recipe.likes.indexOf(idUser) === -1) {
      recipe.likes.push(idUser);
      recipe.save();
    }
    return res.status(200).send('Favoritado');
  },
  async removeFromFavorite({ req, res }) {
    const { idUser } = req.authenticatedUser;
    const { idRecipe } = req.body;

    const recipe = await Recipe.findById(idRecipe);

    if (!recipe) return res.status(404).send('Receita não encontrada');

    const index = recipe.likes.indexOf(idUser);

    if (index === -1)
      return res.status(404).send('Receita não está nos favoritos');

    recipe.likes.splice(index, 1);
    await recipe.save();

    return res.status(200).send('Favorito removido com sucesso');
  },
  async find({ req, res }) {
    const { idUser } = req.authenticatedUser;
    const limit = parseInt(req.query.limit) || 10;
    const offset = req.query.offset || 0;

    const recipes = await Recipe.find({ likes: { $all: [idUser] } })
      .limit(limit)
      .skip(limit * offset)
      .populate('user')
      .sort({ createdAt: -1 });

    if (!recipes) return res.status(404).send('Nenhum receita encontrada');

    return res.status(200).send(recipes);
  },
};

module.exports = favoriteActions;
