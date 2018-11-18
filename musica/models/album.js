const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  titre: String,
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie',
  },
  quantiteEnStock: Number,
  prix: Number,
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
