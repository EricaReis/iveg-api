const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../user/user.model');

const baseUrl = process.env.BASE_URL;

const authActions = {
  async authenticate({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) return 'Usuário não encontrado';

    if (!(await bcrypt.compare(password, user.password)))
      return 'Senha inválida';

    const secret = process.env.ADMIN_SECRET;

    const token = jwt.sign({ idUser: user.idUser }, secret, {
      expiresIn: 86400,
    });

    const data = {
      token,
      name: user.name,
    };

    return data;
  },
  async request({ email }) {
    const user = await User.findOne({ email });

    if (!user) return 'Usuário não encontrado';

    return 'email enviado';
  },
  async reset({ email, token, password }) {
    const now = new Date();

    const user = await User.findOne({ email });

    if (!user) return 'Usuário não encontrado';

    if (user.forgotToken !== token) return 'Token inválido';

    if (now > user.expiresToken) return 'Token expirado, gere novamente';

    user.password = password;
    await user.save();

    return 'Senha alterada com sucesso';
  },
  async change(teste) {
    const { idUser } = authenticatedUser;

    const user = await User.findById(idUser);

    if (!(await bcrypt.compare(oldPassword, user.password)))
      return 'Senha inválida';

    user.password = newPassword;
    await user.save();

    return 'Senha alterada com sucesso';
  },
};

module.exports = authActions;
