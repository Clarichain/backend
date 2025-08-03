require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const aiRoutes = require('./routes/ai');

const app = express();

app.use(cors());
app.use(express.json()); // Must come before any route that reads req.body

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter); 
app.use('/ai', aiRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/clarichain-ai')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
