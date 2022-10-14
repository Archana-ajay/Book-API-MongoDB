const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of book'],
      maxlength: 30
    },
    author: {
      type: String,
      required: [true, 'Please provide the author of book'],
      maxlength: 50
    },
    imageUrl: {
      type: String,
      required:[true,'Please provide url of book image']
    
    },
    price:Number,
    pages:{
        type:Number,
        min:100
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
  },
},
  { timestamps: true }
)

module.exports = mongoose.model('Book', BookSchema)