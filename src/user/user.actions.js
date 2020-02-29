const User = require('./user.model');
const formatResponse = require('../common/formatResponse')
const userActions = {
    async saveUser(data) {
        try {
            await User.create(data)
            return "Usuário cadastrado com sucesso"
        } catch (error) {
            return error
        }
    },
    async findAll(data) {
        const limit = parseInt(data.limit) || 10;
        const offset = data.offset || 0;
        try {
            const users = await User.find().limit(limit).skip(limit * offset)
            return formatResponse(users, { limit, offset });
        } catch (error) {
            return error;
        }
    }
}

module.exports = userActions