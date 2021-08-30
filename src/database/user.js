import mongoose from 'mongoose';

const { Schema } = mongoose;
const Float = require('mongoose-float').loadType(mongoose, 2);

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  location: {
    country: { type: String },
    city: { type: String },
    address: { type: String },
    loc: {
      type: { type: String, default: 'Point' },
      coordinates: [
        { type: Float },
      ],
    },
  },
}, { timestamps: true });

export default mongoose.model('user', userSchema);
