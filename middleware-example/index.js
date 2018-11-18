const config = require("config");
const express = require(`express`);
const startupDebugger = require(`debug`)(`app:startup`);

const morgan = require(`morgan`);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));

// app.use(express.json());

app.use((req, res, next) => {
  startupDebugger(`Log en cours`);

  next();
});

app.get(`/`, (req, res) => {
  startupDebugger(`Hello world`);
  res.send(`Hello world`);
});

console.log(process.env[config.get(`mdp`)]);

app.listen(PORT, function() {
  console.log("Example app listening on port http://localhost:%s!", PORT);
});
