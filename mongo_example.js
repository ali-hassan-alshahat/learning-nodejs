// const { MongoClient } = require("mongodb");
// const uri =
//   "mongodb+srv://alihassanalshahat:alihassan11@learn-mongo-db.p2iueiv.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo-db";
// const client = new MongoClient(uri);

// const main = async () => {
//   await client.connect();
//   console.log("connected successfully");
//   const db = client.db("codeZone");
//   const collection = db.collection("courses");
//   collection.insertOne({
//     title: "C# bootcamp",
//     price: 3000,
//   });
//   const data = await collection.find().toArray();
//   console.log("data", data);
// };
// main();
