const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nom: String,
  privilege: Boolean,
  telephone: {
    type: String,
    validate: {
      validator: function(value) {
        return value && value.match(/^[\d]{3}-[\d]{3}-[\d]{4}$/);
      },
      message: 'Ce numéro de téléphone est incorrect',
    },
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
