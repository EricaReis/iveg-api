const User = require('./user.model');

const userActions = {
    async saveUser(data) {
        try {
            await User.create(data)
            return "Usuário cadastrado com sucesso"
        } catch (error) {
            return error
        }
    }
}

module.exports = userActions