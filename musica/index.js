const express = require(`express`);
const mongoose = require('mongoose');

const { CategorieRouter } = require(`./routes`);

mongoose
  .connect(
    'mongodb://localhost/musica',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connecté à la BD Mongo...'))
  .catch(error => console.log('Echec de connexion à la BD Mongo...', error));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(`/api/categories`, CategorieRouter);

app.listen(PORT, function() {
  console.log('Example app listening on port http://localhost:%s!', PORT);
});
