import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Float = require('mongoose-float').loadType(mongoose, 4);

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'review',
    },
  ],
  isAvailable: { type: Boolean, default: true },
  rating: { type: Float, default: 0.0 },
  location: {
    country: { type: String },
    city: { type: String },
    address: { type: String },
  },
  geo: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      default: 'Point',
    },
    coordinates: [
      { type: Number },
    ],
  },
  userId: {
    type: Schema.Types.ObjectId, required: true, ref: 'user',
  },
}, { timestamps: true });

productSchema.index({ geo: '2dsphere', name: 'text' });

productSchema.plugin(mongoosePaginate);
export default mongoose.model('product', productSchema);
