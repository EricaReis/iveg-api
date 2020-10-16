const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    forgotToken: {
      type: String,
    },
    expiresToken: {
      type: Date,
      default: new Date(),
    },
    bio: {
      type: String,
    },
    url_img: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

schema.pre('save', async function encrypt(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

module.exports = mongoose.model('User', schema, 'users');
