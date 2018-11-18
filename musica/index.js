const express = require(`express`);
const mongoose = require('mongoose');
const Fawn = require('fawn');

const { CategorieRouter, AlbumRouter, CommandeRouter } = require(`./routes`);

mongoose
  .connect(
    'mongodb://localhost/musica',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connecté à la BD Mongo...'))
  .catch(error => console.log('Echec de connexion à la BD Mongo...', error));
Fawn.init(mongoose);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(`/api/categories`, CategorieRouter);
app.use(`/api/albums`, AlbumRouter);
app.use(`/api/commandes`, CommandeRouter);

app.listen(PORT, function() {
  console.log('Example app listening on port http://localhost:%s!', PORT);
});
