const express = require("express");
const app = express();
const port = 4000;

app.use(require('./routes/photo')); 
app.use(require('./routes/contest')); 

app.get("/", (req, res) => {
  res.send(
    "Hello, I'm Photo-Contest Server! Would be nice to have Swagger here"
  );
});

app.listen(port, () => {
  console.log(`Photo-Contest Server, listening on port ${port}`);
});

