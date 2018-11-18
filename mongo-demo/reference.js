const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost/web",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connecté à MongoDB..."))
  .catch(error => console.error("Connexion échouée à MongoDB...", error));

const Auteur = mongoose.model(
  "Auteur",
  new mongoose.Schema({
    nom: String,
    bio: String,
    siteweb: String
  })
);

const Atelier = mongoose.model(
  "Atelier",
  new mongoose.Schema({
    nom: String,
    auteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auteur"
    }
  })
);

async function creerAuteur(nom, bio, siteweb) {
  const auteur = new Auteur({
    nom,
    bio,
    siteweb
  });

  const result = await auteur.save();
  console.log(result);
}

async function creerAtelier(nom, auteur) {
  const atelier = new Atelier({
    nom,
    auteur
  });

  const result = await atelier.save();
  console.log(result);
}

async function listerAteliers() {
  const ateliers = await Atelier.find()
    .populate("auteur", "nom -_id")
    .select("nom");
  console.log(ateliers);
}

// creerAuteur('Rostom', 'Ma bio', 'Mon siteweb');

// creerAtelier("Node", "5bf17a15b95bc814885dcdc2");

listerAteliers();
