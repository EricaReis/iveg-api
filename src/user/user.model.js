const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String
    },
    url_img:{
        type: String
    }
})

module.exports = mongoose.model('User', schema, 'users')
