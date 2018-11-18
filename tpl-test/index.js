const express = require(`express`);
const pug = require(`pug`);

const app = express();
const PORT = process.env.PORT || 3000;

app.set(`view engine`, `pug`);
app.set(`views`, `views`);

app.listen(PORT, function() {
  console.log("Example app listening on port http://localhost:%s!", PORT);
});

app.get("/", function(req, res) {
  res.render(`layout`, { title: `efefefe`, message: `message` });
});
