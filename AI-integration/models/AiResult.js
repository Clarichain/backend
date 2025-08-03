const mongoose = require('mongoose');
const aiResultSchema = new mongoose.Schema({
  type: String,
  input: mongoose.Schema.Types.Mixed,
  output: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('AiResult', aiResultSchema);
