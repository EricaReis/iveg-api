const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    how_to_do: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    url_img: {
      type: String,
    },
    url_video: {
      type: String,
    },
    time: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: [
      {
        type: mongoose.ObjectId,
        ref: 'User',
      },
    ],
    comment: [
      {
        comment: {
          type: String,
        },
        user: {
          type: mongoose.ObjectId,
          ref: 'User',
        },
      },
    ],
    ingredient: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', schema, 'recipes');
