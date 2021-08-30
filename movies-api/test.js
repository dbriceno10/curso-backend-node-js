const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://db_user_platzivideos:PIKjSuJm8MrbfbxU@cluster0.yunrn.mongodb.net/platzivideos_db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});