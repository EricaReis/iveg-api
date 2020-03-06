const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    how_to_do: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    url_img: {
        type: String
    },
    url_video: {
        type: String
    },
    user: {
        type: mongoose.objectId,
        ref: 'User',
        required: true
    },
    likes: [
        {
            type: mongoose.objectId,
            ref: 'User'
        }
    ],
    comment: [
        {
            comment: {
                type: String
            },
            user: {
                type: mongoose.objectId,
                ref: 'User'
            }
        }
    ],
    ingredient: [
        {
            name: {
                type: String
            },
            quantity: {
                type: String
            }
        }
    ]


})

module.exports = mongoose.model('Recipe', schema, 'users')