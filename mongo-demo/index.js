const faker = require("faker");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost/demo",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connecté à la BD Mongo..."))
  .catch(error => console.log("Echec de connexion à la BD Mongo...", error));

function fillArrayWithStrings(size) {
  return Array.apply(null, { length: size }).map(function() {
    return faker.random.word();
  });
}

const atelierSchema = new mongoose.Schema({
  nom: String,
  auteur: String,
  sujets: {
    type: [String],
    validate: {
      validator: function(value) {
        console.log(`value`, value);
        return value && value.length > 0;
      },
      message: "Un atelier doit avoir au moins un sujet."
    }
  },
  date: { type: Date, default: Date.now },
  disponible: Boolean,
  prix: Number
});

const Atelier = mongoose.model("Atelier", atelierSchema);

async function genererAtelier({
  nom,
  auteur,
  sujets = [],
  disponible = true,
  prix
}) {
  const tempAtelier = new Atelier({
    nom,
    auteur,
    sujets,
    disponible,
    prix
  });

  return await tempAtelier.save();
}

async function creerAtelier() {
  try {
    const newAtelier = await genererAtelier({
      nom: faker.name.findName(),
      auteur: faker.name.findName(),
      // sujets: null,
      sujets: fillArrayWithStrings(Math.floor(Math.random() * 3)),
      disponible: faker.random.boolean(),
      prix: 15
    });
    console.log(`newAtelier`, newAtelier);
  } catch (e) {
    Object.keys(e.errors).forEach(key => {
      console.log(e.errors[key].message);
    });
  }
}

async function chercherAtelier(predicate = undefined, predicate2 = undefined) {
  let ateliers = await Atelier.find(predicate).or(predicate2);

  console.log(`-------- Ateliers trouvés --------`);
  console.log(ateliers);
  console.log(`----------------------------------`);
}

// async function miseAJourAtelier(id, data) {
//   const atelier = await Atelier.findById(id);
//   if (!atelier) return;

//   Object.keys(data).forEach(item => {
//     atelier[item] = data[item];
//   });

//   const result = await atelier.save();
//   console.log(`result`, result);
// }

async function miseAJourAtelier(id, data) {
  const atelier = await Atelier.update(
    { _id: id },
    {
      $set: {
        ...data
      }
    }
  );

  console.log(`atelier`, atelier);
}

// creerAtelier();

miseAJourAtelier("5bdf47651f6b322b00eb2aaa", { prix: 4775, disponible: true });

// chercherAtelier(undefined, [{ disponible: false }, { prix: { $gte: 10 } }]);
// chercherAtelier({ prix: { $gte: 10 } });
// chercherAtelier({ disponible: false, auteur: /.*R.*/i });
