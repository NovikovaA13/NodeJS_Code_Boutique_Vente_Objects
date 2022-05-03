const express = require('express');
const mongoose = require('mongoose');
const stuffRouter = require('./routes/stuffRouter');
const userRouter = require('./routes/userRouter');
const path = require('path');

mongoose.connect('mongodb+srv://PASSWORD:PASSWORD@cluster0.o8jpn.mongodb.net/Things?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
 });
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use('/api/stuff', stuffRouter);
app.use('/api/auth', userRouter);



module.exports = app;