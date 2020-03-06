const User = require('./user.model');
const formatResponse = require('../common/formatResponse')
const userActions = {
    saveUser(data) {
        return new Promise((resolve, reject) => {
            User.create(data).then(() => {
                return resolve("Usuário cadastrado com sucesso")
            }).catch(err => {
                return reject(err)
            })
        })

    },
    findAll(data) {
        return new Promise((resolve, reject) => {
            const limit = parseInt(data.limit) || 10;
            const offset = data.offset || 0;
            User.find().limit(limit).skip(limit * offset).then(res => {
                return resolve(formatResponse(res, { limit, offset }))
            }).catch(err => {
                return reject(err)
            })
        })
    },
    findOne(id) {
        return new Promise((resolve, reject) => {
            User.findById(id).then(user => {
                return resolve(user)
            }).catch(err => {
                return reject(err)
            })
        })
    },
    editUser(req) {
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate(req.params.id, req.body).then(user => {
                return resolve(user)
            }).catch(err => {
                return reject(err)
            })
        })
    },
    deleteUser(id) {
        return new Promise((resolve, reject) => {
            User.findByIdAndDelete(id).then(user => {
                return resolve(user)
            }).catch(err => {
                return reject(err)
            })
        })
    }
}

module.exports = userActions