const router = require(`express`).Router();

const { Categorie } = require('../models');

router.get(`/`, async (_, res) => {
  let categories = await Categorie.find();

  res.send(categories);
});

router.post(`/`, async (req, res) => {
  const {
    body: { name = 'Hello' },
  } = req;

  const newCateory = new Categorie({
    nom: name,
  });

  await newCateory.save();

  res.send(newCateory);
});

router.get(`/:id`, async (req, res) => {
  const foundCategory = await Categorie.find({ _id: req.params.id });
  if (!foundCategory) res.status(404);
  res.send(foundCategory);
});

router.put(`/:id`, async (req, res) => {
  const foundCategory = await Categorie.findOneAndUpdate(
    { _id: req.params.id },
    {
      ...req.body,
    },
    { new: true }
  );

  res.send(foundCategory);
});

router.delete(`/:id`, async (req, res) => {
  const foundCategory = await Categorie.findByIdAndRemove(
    req.params.id,
    {
      ...req.body,
    },
    { new: true }
  );

  res.send(foundCategory);
});

module.exports = router;
