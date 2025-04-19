import mongoose from 'mongoose'
import slugify from 'slugify'

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  bio: {
    type: String,
    required: [true, 'Author bio is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Author image is required'],
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Generate slug before saving
authorSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('name')) {
    this.slug = slugify(this.name, { 
      lower: true,
      strict: true,
      trim: true
    })
  }
  next()
})

// Generate slug before updating
authorSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate() as any
  if (update && update.name) {
    update.slug = slugify(update.name, {
      lower: true,
      strict: true,
      trim: true
    })
  }
  next()
})

const Author = mongoose.models.Author || mongoose.model('Author', authorSchema)

export default Author 