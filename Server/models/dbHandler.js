const { MongoClient, ServerApiVersion } = require("mongodb");
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const encodedPass = process.env.MONGO_PASSWORD.toString("base64");
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${encodedPass}@cluster0.9ky6q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

let mongo = new MongoClient(uri);

const connectToDb = async () => {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  //const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";

  try {
    // Connect to the MongoDB cluster
    await mongo.connect();

    // Make the appropriate DB calls
    // const databasesList = await mongo.db().admin().listDatabases();
    // console.log("Databases:");
    // databasesList.databases.forEach((db) => console.log(` - ${db.name}`));

    // var myobj = { name: "rong", age: "28", address: "Delhi" };
    // // const res = await client.db().collection("myCollection2").insertOne(myobj);
    // // console.log(`res = ${JSON.stringify(res)}`);
    // const res2 = await client.db().collection("myCollection2").watch;
    // console.log(`res = ${JSON.stringify(res2)}`);
    console.log("---- connected successfully ----");
  } catch (e) {
    console.error(`failed to connect. reason: ${e}`);
  }
  return mongo;
};

module.exports = { mongo, connectToDb };
