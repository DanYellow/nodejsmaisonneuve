const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost/mongo-exercises",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connecté à la BD Mongo..."))
  .catch(error => console.log("Echec de connexion à la BD Mongo...", error));

const atelierSchema = new mongoose.Schema({
  nom: String,
  auteur: String,
  sujets: {
    type: [String],
    validate: {
      isAsync: true,
      validator: function(value, callback) {
        setTimeout(() => {
          console.log(`value`, value);
          return value && value.length > 0;
        });
      },
      message: "Un atelier doit avoir au moins un sujet."
    }
  },
  date: { type: Date, default: Date.now },
  disponible: Boolean,
  prix: Number
});
const Atelier = mongoose.model("Atelier", atelierSchema);

async function chercherAtelier(predicate = {}) {
  let ateliers = await Atelier.find(predicate)
    .select({ nom: 1, auteur: 1, _id: 0 })
    .sort({ nom: "DESC" });
  console.log(`-------- Ateliers trouvés --------`);
  console.log(ateliers);
  console.log(`----------------------------------`);
}

// chercherAtelier({ nom: "Atelier React" });
chercherAtelier({ sujets: { $in: ["node", "angular", "java"] } });

// Atelier.find({ prix: { $in: [10, 20, 30] } });
