const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Chat', Chat);