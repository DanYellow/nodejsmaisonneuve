const router = require(`express`).Router();

const { Client } = require('../models');

router.get(`/`, async (_, res) => {
  let clients = await Client.find();

  res.send(clients);
});

router.post(`/`, async (req, res) => {
  const { body = { name: 'Hello' } } = req;

  const newClient = new Client(body);

  await newClient.save();

  res.send(newClient);
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
