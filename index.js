require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wbmifec.mongodb.net/?retryWrites=true&w=majority`; 
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("personalWebsite");
    const projectCollection = db.collection("project");

    app.post("/project", async (req, res) => {
      const user = req.body;
      const result = await projectCollection.insertOne(user);
      res.send(result);
    });
    app.get("/project", async (req, res) => {
      const keyword = req.query.keyword
      const query = { keyword: keyword };
      const cursor = projectCollection.find(query);
      const result = await cursor.toArray();
      res.send({ status: true, data: result });
    });
    app.get("/latest_project", async (req, res) => {
      const cursor = projectCollection.find({});
      const result = await cursor.toArray();
      res.send({ status: true, data: result });
    })
   
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
