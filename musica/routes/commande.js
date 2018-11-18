const router = require(`express`).Router();
const _map = require(`lodash`).map;

const { Album, Commande, Client } = require('../models');

router.get(`/`, async (_, res) => {
  let tempCommandes = await Commande.find()
    .populate('albums')
    .populate('client');

  res.send(tempCommandes);
});

router.post(`/`, async (req, res) => {
  const { body } = req;

  const albums = await Promise.all(
    body.albums.map(async item => {
      const newAlbum = new Album(item);
      await newAlbum.save();

      return newAlbum;
    }, [])
  );

  const newClient = new Client(body.client);
  await newClient.save();

  const bodyCopy = JSON.parse(
    JSON.stringify({
      ...body,
      albums: _map(albums, '_id'),
      client: newClient._id,
    })
  );

  const newCommande = new Commande(bodyCopy);
  await newCommande.save();

  res.send(newCommande);
});

// router.get(`/:id`, async (req, res) => {
//   const foundCategory = await Categorie.find({ _id: req.params.id });
//   if (!foundCategory) res.status(404);
//   res.send(foundCategory);
// });

// router.put(`/:id`, async (req, res) => {
//   const foundCategory = await Categorie.findOneAndUpdate(
//     { _id: req.params.id },
//     {
//       ...req.body,
//     },
//     { new: true }
//   );

//   res.send(foundCategory);
// });

// router.delete(`/:id`, async (req, res) => {
//   const foundCategory = await Categorie.findByIdAndRemove(
//     req.params.id,
//     {
//       ...req.body,
//     },
//     { new: true }
//   );

//   res.send(foundCategory);
// });

module.exports = router;
