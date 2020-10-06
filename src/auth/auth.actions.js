const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sendEmailExpireToken = require('../../helper/sendEmailExpireToken');

const { User, Setting } = require('../models');
const result = require('../../helper/result');

const baseUrl = process.env.BASE_URL;

const authActions = {
  async authenticate({ email, password }) {
    const user = await User.findOne({ where: { email } });

    if (!user) return result(null, 'Usuário não encontrado', 404);

    if (!(await bcrypt.compare(password, user.password)))
      return result(null, 'Senha inválida', 400);

    const secret = process.env.ADMIN_SECRET;

    const token = jwt.sign(
      { idUser: user.idUser, isAdmin: user.isAdmin },
      secret,
      {
        expiresIn: 86400,
      }
    );

    const data = {
      token,
      isAdmin: user.isAdmin,
      name: user.name,
      nuvemShopIdStore: user.nuvemShopIdStore,
      nuvemShopOriginalDomain: user.nuvemShopOriginalDomain,
    };

    return result(data, null, 200);
  },
  async request({ email }) {
    const subject = 'Alteração de senha';
    const text =
      'Para alterar a sua senha entre no link a seguir e escolha sua nova senha. ';

    const user = await User.findOne({ where: { email } });

    if (!user) return result(null, 'Usuário não encontrado', 404);

    const urlBase = `${baseUrl}/reset-password`;

    await sendEmailExpireToken(email, subject, text, urlBase);

    return result(null, 'email enviado', 200);
  },
  async reset({ email, token, password }) {
    const now = new Date();

    const user = await User.findOne({ where: { email } });

    if (!user) return result(null, 'Usuário não encontrado', 404);

    if (user.forgotToken !== token) return result(null, 'Token inválido', 400);

    if (now > user.expiresToken)
      return result(null, 'Token expirado, gere novamente', 400);

    user.password = password;
    await user.save();

    return result(null, 'Senha alterada com sucesso', 200);
  },
  async change({ oldPassword, newPassword, authenticatedUser }) {
    const { idUser } = authenticatedUser;

    const user = await User.findOne({ where: { idUser } });

    if (!(await bcrypt.compare(oldPassword, user.password)))
      return result(null, 'Senha inválida', 400);

    user.password = newPassword;
    await user.save();

    return result(null, 'Senha alterada com sucesso', 200);
  },
};

module.exports = authActions;
