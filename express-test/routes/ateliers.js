const router = require(`express`).Router();
const Joi = require('joi');

const validateAtelier = atelier => {
  const schema = {
    title: Joi.string()
      .required()
      .min(3),
  };

  return Joi.validate(atelier, schema).error;
};

let ateliers = [
  { id: 78, title: `hello` },
  { id: 1, title: `hello` },
  { id: 75, title: `hello` },
];

router.get('/', function(req, res) {
  res.send(ateliers);
});

router.post(`/`, (req, res) => {
  const {
    body: { title },
  } = req;

  if (validateAtelier(req.body)) {
    return res.send('atelier');
  }

  const atelier = {
    id: ateliers.length + 1,
    title,
  };

  ateliers.push(atelier);

  res.send(atelier);
});

router.get(`/:id`, (req, res) => {
  const atelier = ateliers.find(item => item.id === Number(req.params.id));
  if (!atelier) {
    return res.status(404).send({ error: 'Not found' });
  }

  res.send(atelier);
});

router.put(`/:id`, (req, res) => {
  const atelier = ateliers.find(item => item.id === Number(req.params.id));

  if (validateAtelier(req.body)) {
    return res.status(404).send({ error: 'Schema not respected' });
  }
  if (!atelier) {
    return res.status(404).send({ error: 'Not found' });
  }
  atelier.title = req.body.title;

  res.send(atelier);
});

router.delete(`/:id`, (req, res) => {
  const atelier = ateliers.find(item => item.id === Number(req.params.id));
  if (!atelier) {
    return res.status(404).send({ error: 'Not found' });
  }
  console.log(`fe`, ateliers.indexOf(atelier));
  // ateliers = ateliers.filter(item => item.id !== Number(req.params.id));
  res.send(atelier);
});

module.exports = router;
