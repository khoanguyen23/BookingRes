const mongoose = require('mongoose');

const featuredSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  title : {
    type: String,
  },
  author : {
    type: String,
  },
  subTitle : {
    type: String,
  },
  description: {
    type: String,
    maxlength: 200,
  },
  image: {
    type: String 
  },
  restaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
  ],
},{ timestamps: true }); 

const Featured = mongoose.model('Featured', featuredSchema);

module.exports = Featured;
