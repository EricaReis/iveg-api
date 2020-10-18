const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../user/user.model');

const authActions = {
  async authenticate({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) return { status: 404, message: 'Usuário não encontrado' };

    if (!(await bcrypt.compare(password, user.password)))
      return { status: 401, message: 'Senha inválida' };

    const secret = process.env.ADMIN_SECRET;

    const token = jwt.sign({ idUser: user._id }, secret, {
      expiresIn: 86400,
    });

    const data = {
      token,
      name: user.name,
    };

    return { status: 200, message: data };
  },
  async change({ authenticatedUser, body }) {
    const { oldPassword, newPassword } = body;
    const { idUser } = authenticatedUser;

    const user = await User.findById(idUser);

    if (!(await bcrypt.compare(oldPassword, user.password)))
      return { status: 401, message: 'Senha inválida' };

    user.password = newPassword;
    try {
      await user.save();

      return { status: 200, message: 'Senha alterada com sucesso' };
    } catch (error) {
      return { status: 500, message: 'Erro ao salvar a nova senha' };
    }
  },
};

module.exports = authActions;
