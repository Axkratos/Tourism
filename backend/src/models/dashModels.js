// models/User.js
import mongoose from 'mongoose';

const dashSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  aboutMe: {
    type: String,
    required: true
  },
  visitLocation: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  phoneNumber:{
    type: Number,
    required: true
  }

}, { timestamps: true });

const Dash = mongoose.model('Dash', dashSchema);

export default Dash;
