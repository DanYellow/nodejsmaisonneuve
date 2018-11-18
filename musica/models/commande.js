const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  albums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
    },
  ],
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  date: {
    type: mongoose.Schema.Types.Date,
    default: new Date(),
  },
});

const Commande = mongoose.model('Commande', commandeSchema);

module.exports = Commande;
