const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  userId: String,
  url: String,
  title: String,
  date: Date
});

module.exports = mongoose.model('Article', ArticleSchema);
