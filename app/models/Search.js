var mongoose = require('mongoose');
var  Schema = mongoose.Schema;

/**
 * search Schema
 */
var searchSchema = new Schema({
  keyword: {
    type: String,
    trim: true,
  },
 
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type:Schema.Types.ObjectId,
    ref:'User'
  },

  no_of_results: {
    type:Number,
  }
});


mongoose.model('Search', searchSchema);