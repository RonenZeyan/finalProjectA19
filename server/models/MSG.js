const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSchema = new Schema({
  title: { 
    type: String,
    required: true
  },
  MsgDate: {
    type: Date,
    default: Date.now
  },
  MsgContent: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['new','old'], //enum for status
  }
}, { timestamps: true }); //add the time of add row in schema in db 

const MsgModel = mongoose.model('MSG', msgSchema);

module.exports = MsgModel;
