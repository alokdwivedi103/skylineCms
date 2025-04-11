import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Category slug is required'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Category description is required'],
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1543002588-bfa74002fd7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  banner: {
    type: String,
    default: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1498&q=80',
  },
  stats: {
    books: {
      type: String,
      default: '0+',
    },
    authors: {
      type: String,
      default: '0+',
    },
    bestSellers: {
      type: String,
      default: '0+',
    },
  },
}, {
  timestamps: true,
})

export default mongoose.models.Category || mongoose.model('Category', categorySchema) 