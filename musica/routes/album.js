const router = require(`express`).Router();

const { Album, Categorie } = require('../models');

router.get(`/`, async (_, res) => {
  let tempAlbums = await Album.find();

  const albums = await Promise.all(
    tempAlbums.map(async item => {
      const itemCopy = JSON.parse(JSON.stringify(item));
      let tempCategorie = await Categorie.findOne({ _id: item.categorie });
      itemCopy.category = tempCategorie;

      return itemCopy;
    }, [])
  );

  res.send(albums);
});

router.post(`/`, async (req, res) => {
  const { body } = req;
  console.log(`body`, body);
  const newAlbum = new Album(body);

  await newAlbum.save();

  res.send(newAlbum);
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
