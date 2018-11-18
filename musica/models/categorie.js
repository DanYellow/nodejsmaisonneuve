const mongoose = require('mongoose');

function test(val) {
  return val + 'bonjour !';
}

const categorieSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          return value.length > 3;
        },
      },
      get: test,
    },
  },
  {
    // toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const Categorie = mongoose.model('Categorie', categorieSchema);

module.exports = Categorie;
