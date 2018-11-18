const Joi = require('joi');

const router = require(`express`).Router();

const validateFormat = obj => {
  const schema = {
    name: Joi.string()
      .required()
      .min(3),
  };

  return Joi.validate(obj, schema).error;
};

let categories = [];

const apiPath = `/api/categories`;

router.get(`/`, (_, res) => {
  res.send(categories);
});

router.post(`/`, (req, res) => {
  const {
    body: { name },
  } = req;

  if (validateFormat(req.body)) {
    return res.send({ error: validateFormat(req.body) });
  }

  const newCateory = {
    id: categories.length + 1,
    name,
  };

  categories.push(newCateory);

  res.send(newCateory);
});

router.get(`/:id`, (req, res) => {
  const foundCategory = categories.find(
    item => item.id === Number(req.params.id)
  );
  if (!foundCategory) {
    return res.status(404).send({ error: 'Not found' });
  }

  res.send(foundCategory);
});

router.put(`/:id`, (req, res) => {
  const foundCategory = categories.find(
    item => item.id === Number(req.params.id)
  );

  if (validateAtelier(req.body)) {
    return res.status(404).send({ error: 'Schema not respected' });
  }
  if (!foundCategory) {
    return res.status(404).send({ error: 'Not found' });
  }
  foundCategory.name = req.body.name;

  res.send(foundCategory);
});

router.delete(`/:id`, (req, res) => {
  const foundCategory = categories.find(
    item => item.id === Number(req.params.id)
  );
  if (!foundCategory) {
    return res.status(404).send({ error: 'Not found' });
  }

  categories = categories.filter(item => item.id !== Number(req.params.id));
  res.send(foundCategory);
});

module.exports = router;
