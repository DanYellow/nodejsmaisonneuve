const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/web")
  .then(() => console.log("Connecté à MongoDB..."))
  .catch(err => console.error("Connexion échouée à MongoDB...", err));

const auteurSchema = new mongoose.Schema({
  nom: String,
  bio: String,
  siteweb: String
});

const Auteur = mongoose.model("Auteur", auteurSchema);

const Atelier = mongoose.model(
  "Atelier",
  new mongoose.Schema({
    nom: String,
    auteurs: [auteurSchema]
  })
);

async function creerAtelier(nom, auteur) {
  const atelier = new Atelier({
    nom,
    auteur
  });

  const result = await atelier.save();
  console.log(result);
}

async function listAteliers() {
  const ateliers = await Atelier.find();
  console.log(ateliers);
}

async function modifierAuteur(atelierId) {
  const atelier = await Atelier.findOneAndUpdate(
    { _id: atelierId },
    {
      $set: {
        "auteur.nom": "Rostom Mesli"
      }
    }
  );

  // const atelier = await Atelier.findById(atelierId);
  // atelier.auteur.nom = "Foxy";
  atelier.save();
}

modifierAuteur("5bf184e663021031305c0aad");
// creerAtelier("Node", new Auteur({ nom: "Rostom" }));
