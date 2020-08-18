const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yourband', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });