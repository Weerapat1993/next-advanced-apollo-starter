import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  updated_at: { type: Date, default: Date.now },
})

export default mongoose.model('Product', ProductSchema)