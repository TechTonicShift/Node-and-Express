const mongoose= require('mongoose');
//Utkarsh's contribution 
const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,  // <-- This means "user" is mandatory
    }
  });
  

module.exports = mongoose.model('Post',postSchema);