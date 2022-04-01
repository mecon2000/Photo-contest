require("dotenv").config();
const express = require("express");
const { connectToDb } = require("./models/dbHandler");
const app = express();
const port = 4000;

app.use(require("./controllers/photo"));
app.use(require("./controllers/contest"));

app.get("/", (req, res) => {
  res.send(
    "Hello, I'm Photo-Contest Server! Would be nice to have Swagger here"
  );
  //TODO use swagger,see example https://blog.logrocket.com/documenting-your-express-api-with-swagger/
});

app.listen(port, async () => {
  await connectToDb();
  console.log(`Photo-Contest Server, listening on port ${port}`);
});
