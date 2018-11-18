const express = require(`express`);
const ateliersRouter = require('./routes/ateliers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(`/api/ateliers`, ateliersRouter);

app.listen(PORT, function() {
  console.log('Example app listening on port http://localhost:%s!', PORT);
});
